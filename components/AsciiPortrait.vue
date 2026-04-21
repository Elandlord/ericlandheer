<template>
    <div
        class="relative inline-block cursor-pointer"
        title="click to replay"
        :style="{ width: `${canvasWidth}px`, height: `${canvasHeight}px` }"
        @click="replay"
    >
        <div
            class="absolute inset-0 pointer-events-none"
            :style="{
                opacity: photoOpacity,
                transition: 'opacity .3s ease',
                backgroundImage: `url('${props.photoSrc}')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '161% 181%',
                backgroundPosition: '50% 37%',
            }"
        />
        <pre
            ref="preRef"
            class="absolute inset-0 select-none"
            :style="{
                margin: 0,
                fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                fontSize: `${FONT_PX_BASE * props.scale}px`,
                fontWeight: 700,
                lineHeight: '1.0',
                letterSpacing: 0,
                whiteSpace: 'pre',
                opacity: asciiOpacity,
                transition: 'opacity .25s ease',
                textShadow: props.glow
                    ? '0 0 6px rgba(34,211,238,0.25), 0 0 18px rgba(167,139,250,0.15)'
                    : 'none',
            }"
        >{{ ready ? '' : '' }}</pre>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';

interface Cell {
    x: number;
    y: number;
    rgb: [number, number, number];
    mask: boolean;
    rampIdx: number;
    asciiColor: [number, number, number];
    noise: number;
}

interface Sampled {
    cells: Cell[];
    W: number;
    H: number;
}

const props = withDefaults(
    defineProps<{
        scale?: number;
        glow?: boolean;
        autoplay?: boolean;
        loop?: boolean;
        morphMs?: number;
        holdMs?: number;
        src?: string;
        photoSrc?: string;
    }>(),
    {
        scale: 1,
        glow: true,
        autoplay: true,
        loop: false,
        morphMs: 2400,
        holdMs: 1600,
        src: '/assets/images/eric.png',
        photoSrc: '/assets/images/eric.jpeg',
    },
);

const RAMP = ' .\'`^":;~_-,=+<>!?ilctr/\\jfnxvuyoaehkpdbqwmzXYUJCLQ0O&8BSZ#%@NMW';
const PORTRAIT_W = 110;
const PORTRAIT_H = 60;
const FONT_PX_BASE = 7;

const preRef = ref<HTMLPreElement | null>(null);
const ready = ref(false);
const tProgress = ref(0);
const photoOpacity = computed(() => Math.max(0, 1 - tProgress.value * 1.3));
const asciiOpacity = computed(() => Math.min(1, tProgress.value * 1.3));
const canvasWidth = computed(() => Math.round(PORTRAIT_W * FONT_PX_BASE * props.scale * 0.6));
const canvasHeight = computed(() => Math.round(PORTRAIT_H * FONT_PX_BASE * props.scale));
let data: Sampled | null = null;
let tVal = 0;
let rafId: number | null = null;
let phase: 'idle' | 'morph-to-ascii' | 'hold-ascii' | 'morph-to-photo' | 'hold-photo' | 'done' = 'idle';
let startTs = 0;
let cache: Sampled | null = null;

function lerpColor(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}
function rgbStr(c: [number, number, number]) {
    return `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})`;
}
function hueRgb(h: number, s = 0.72, l = 0.68): [number, number, number] {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r: number, g: number, b: number;
    if (h < 60) [r, g, b] = [c, x, 0];
    else if (h < 120) [r, g, b] = [x, c, 0];
    else if (h < 180) [r, g, b] = [0, c, x];
    else if (h < 240) [r, g, b] = [0, x, c];
    else if (h < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];
    return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}

function sampleImage(img: HTMLImageElement, W = PORTRAIT_W, H = PORTRAIT_H): Sampled {
    const c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    const ctx = c.getContext('2d')!;
    const s = Math.min(img.width, img.height) * 0.62;
    const sx = (img.width - s) / 2;
    const sy = (img.height - s) / 2 - s * 0.08;
    ctx.clearRect(0, 0, W, H);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, sx, sy, s, s * 0.95, 0, 0, W, H);
    const raw = ctx.getImageData(0, 0, W, H).data;

    const lums = new Float32Array(W * H);
    const alphas = new Uint8ClampedArray(W * H);
    let lmin = 255,
        lmax = 0;
    for (let p = 0, pi = 0; p < raw.length; p += 4, pi++) {
        const r = raw[p], g = raw[p + 1], b = raw[p + 2], a = raw[p + 3];
        const L = 0.299 * r + 0.587 * g + 0.114 * b;
        lums[pi] = L;
        alphas[pi] = a;
        if (a > 180) {
            if (L < lmin) lmin = L;
            if (L > lmax) lmax = L;
        }
    }
    const range = Math.max(1, lmax - lmin);

    const cells: Cell[] = [];
    let seed = 1;
    const rand = () => {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        return seed / 0x7fffffff;
    };
    for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
            const pi = y * W + x;
            const i = pi * 4;
            const r = raw[i], g = raw[i + 1], b = raw[i + 2];
            const a = alphas[pi];
            const mask = a > 160;
            const Lnorm = Math.max(0, Math.min(1, (lums[pi] - lmin) / range));
            const Lg = Math.pow(Lnorm, 0.85);
            const rampIdx = mask ? Math.floor(Lg * (RAMP.length - 1)) : 0;
            const t = x / (W - 1);
            const hue = t < 0.5 ? 190 + (t / 0.5) * 75 : 265 + ((t - 0.5) / 0.5) * 60;
            cells.push({
                x,
                y,
                rgb: mask ? [r, g, b] : [0, 0, 0],
                mask,
                rampIdx,
                asciiColor: hueRgb(hue),
                noise: rand(),
            });
        }
    }
    return { cells, W, H };
}

function loadPortrait(cb: (s: Sampled) => void) {
    if (cache) {
        cb(cache);
        return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = props.src;
    img.onload = () => {
        cache = sampleImage(img);
        cb(cache);
    };
}

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

function paint() {
    if (!data || !preRef.value) return;
    const { cells, W, H } = data;
    const t = tVal;
    let html = '';
    for (let y = 0; y < H; y++) {
        html += '<div>';
        for (let x = 0; x < W; x++) {
            const c = cells[y * W + x];
            const flip = Math.max(0, Math.min(1, (t - c.noise + 0.12) / 0.24));
            let ch: string;
            let col: [number, number, number] | null;
            if (!c.mask) {
                ch = ' ';
                col = null;
            } else if (flip <= 0) {
                ch = '█';
                col = c.rgb;
            } else if (flip >= 1) {
                ch = RAMP[c.rampIdx] === ' ' ? '·' : RAMP[c.rampIdx];
                col = c.asciiColor;
            } else {
                ch = flip < 0.5 ? '▓' : flip < 0.8 ? '▒' : RAMP[c.rampIdx] === ' ' ? '·' : RAMP[c.rampIdx];
                col = lerpColor(c.rgb, c.asciiColor, flip);
            }
            if (ch === ' ') html += ' ';
            else html += `<span style="color:${rgbStr(col!)}">${ch}</span>`;
        }
        html += '</div>';
    }
    preRef.value.innerHTML = html;
}

function runLoop() {
    startTs = performance.now();
    phase = 'morph-to-ascii';
    const tick = (now: number) => {
        const dt = now - startTs;
        if (phase === 'morph-to-ascii') {
            const k = Math.min(1, dt / props.morphMs);
            tVal = easeInOut(k);
            tProgress.value = tVal;
            paint();
            if (k >= 1) {
                phase = 'hold-ascii';
                startTs = now;
            }
        } else if (phase === 'hold-ascii') {
            if (dt > props.holdMs) {
                if (props.loop) {
                    phase = 'morph-to-photo';
                    startTs = now;
                } else {
                    phase = 'done';
                    return;
                }
            }
        } else if (phase === 'morph-to-photo') {
            const k = Math.min(1, dt / (props.morphMs * 0.7));
            tVal = 1 - easeInOut(k);
            tProgress.value = tVal;
            if (k >= 1) {
                phase = 'hold-photo';
                startTs = now;
            }
        } else if (phase === 'hold-photo') {
            if (dt > 800) {
                phase = 'morph-to-ascii';
                startTs = now;
            }
        }
        rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
}

let startTimeout: ReturnType<typeof setTimeout> | null = null;

function start() {
    if (!data) return;
    ready.value = true;
    if (props.autoplay) {
        startTimeout = setTimeout(runLoop, 1500);
    }
}

function replay() {
    if (rafId) cancelAnimationFrame(rafId);
    tVal = 0;
    tProgress.value = 0;
    setTimeout(runLoop, 700);
}

onMounted(() => {
    loadPortrait((s) => {
        data = s;
        start();
    });
});

onBeforeUnmount(() => {
    if (rafId) cancelAnimationFrame(rafId);
    if (startTimeout) clearTimeout(startTimeout);
});

watch(
    () => props.src,
    () => {
        cache = null;
    },
);
</script>
