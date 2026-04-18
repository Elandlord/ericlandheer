<template>
    <section id="about" class="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40">
        <div class="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div class="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

        <div class="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16 lg:px-8">
            <div ref="textRef">
                <div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                    <span class="relative flex h-2 w-2">
                        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                        <span class="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                    </span>
                    Based in Groningen · Starting at Simplicate in June 2026
                </div>

                <h1 class="mt-6 font-display text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                    Full stack engineer
                    <span class="text-gradient">building pragmatic,<br />scalable software.</span>
                </h1>

                <p class="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                    I started building for the web at 15 and still enjoy turning complex ideas into reliable experiences. Laravel, Symfony and Vue are my baseline. I also reach for Go, NATS and cloud tooling when a problem asks for it.
                </p>

                <div class="mt-9 flex flex-wrap items-center gap-3">
                    <a
                        href="#experience"
                        class="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-accent to-indigo-500 px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-lg shadow-accent/30 transition hover:shadow-accent/50"
                    >
                        <span>See my work</span>
                        <Icon name="ph:arrow-right-bold" class="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </a>
                    <a
                        href="https://github.com/Elandlord"
                        target="_blank"
                        rel="noreferrer"
                        class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                        <Icon name="mdi:github" class="h-4 w-4" />
                        GitHub
                    </a>
                </div>

                <dl class="mt-10 grid max-w-md grid-cols-3 gap-6">
                    <div>
                        <dt class="text-xs uppercase tracking-[0.2em] text-slate-500">Years shipping</dt>
                        <dd class="mt-1 font-display text-2xl font-bold text-white">10+</dd>
                    </div>
                    <div>
                        <dt class="text-xs uppercase tracking-[0.2em] text-slate-500">Stack</dt>
                        <dd class="mt-1 font-display text-2xl font-bold text-white">PHP · TS · Go</dd>
                    </div>
                    <div>
                        <dt class="text-xs uppercase tracking-[0.2em] text-slate-500">Home</dt>
                        <dd class="mt-1 font-display text-2xl font-bold text-white">NL 🇳🇱</dd>
                    </div>
                </dl>
            </div>

            <div class="relative mx-auto w-full max-w-md" ref="cardRef">
                <div
                    class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.35),transparent_60%)] blur-2xl"
                    :style="haloStyle"
                />
                <div
                    ref="portraitRef"
                    class="relative will-change-transform"
                    style="transform-style: preserve-3d"
                    :style="portraitStyle"
                >
                    <img
                        src="/assets/images/eric.png"
                        alt="Portrait of Eric Landheer"
                        class="relative h-auto w-full select-none"
                        draggable="false"
                        :style="imgStyle"
                    />
                    <div
                        class="pointer-events-none absolute inset-0 mix-blend-soft-light"
                        :style="lightStyle"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

const textRef = ref<HTMLElement | null>(null);
const cardRef = ref<HTMLElement | null>(null);
const portraitRef = ref<HTMLElement | null>(null);

const rotX = ref(0);
const rotY = ref(0);
const lightX = ref(50);
const lightY = ref(50);

let targetRotX = 0;
let targetRotY = 0;
let targetLightX = 50;
let targetLightY = 50;
let rafId: number | null = null;
let removeListener: (() => void) | null = null;

const portraitStyle = computed(() => ({
    transform: `perspective(1200px) rotateX(${rotX.value}deg) rotateY(${rotY.value}deg)`,
}));

const lightStyle = computed(() => ({
    background: `radial-gradient(circle at ${lightX.value}% ${lightY.value}%, rgba(255, 255, 255, 0.22), transparent 55%)`,
    WebkitMaskImage: 'url(/assets/images/eric.png)',
    maskImage: 'url(/assets/images/eric.png)',
    WebkitMaskSize: '100% 100%',
    maskSize: '100% 100%',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
}));

const imgStyle = computed(() => ({
    filter: `drop-shadow(${-rotY.value * 1.4}px ${rotX.value * 1.4 + 18}px 40px rgba(0, 0, 0, 0.55))`,
}));

const haloStyle = computed(() => ({
    transform: `translate(${rotY.value * 1.2}px, ${-rotX.value * 1.2}px)`,
    transition: 'transform 0.3s ease-out',
}));

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const tick = () => {
    rotX.value = lerp(rotX.value, targetRotX, 0.08);
    rotY.value = lerp(rotY.value, targetRotY, 0.08);
    lightX.value = lerp(lightX.value, targetLightX, 0.12);
    lightY.value = lerp(lightY.value, targetLightY, 0.12);
    rafId = requestAnimationFrame(tick);
};

onMounted(async () => {
    if (typeof window === 'undefined') return;

    const handleMove = (e: MouseEvent) => {
        if (!portraitRef.value) return;
        const rect = portraitRef.value.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = clamp((e.clientX - cx) / (window.innerWidth / 2), -1, 1);
        const dy = clamp((e.clientY - cy) / (window.innerHeight / 2), -1, 1);
        targetRotY = dx * 16;
        targetRotX = -dy * 11;
        targetLightX = clamp(((e.clientX - rect.left) / rect.width) * 100, -20, 120);
        targetLightY = clamp(((e.clientY - rect.top) / rect.height) * 100, -20, 120);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    removeListener = () => window.removeEventListener('mousemove', handleMove);
    rafId = requestAnimationFrame(tick);

    const { default: gsap } = await import('gsap');
    if (textRef.value) {
        gsap.from(textRef.value.querySelectorAll('h1, p, .inline-flex, dl, a'), {
            y: 24,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.08,
        });
    }
    if (cardRef.value) {
        gsap.from(cardRef.value, {
            y: 40,
            opacity: 0,
            duration: 1.1,
            ease: 'power3.out',
            delay: 0.2,
        });
    }
});

onBeforeUnmount(() => {
    removeListener?.();
    if (rafId !== null) cancelAnimationFrame(rafId);
});
</script>
