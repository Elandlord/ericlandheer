<template>
    <div class="flex flex-col items-center justify-center gap-5" style="min-height: 320px">
        <Transition name="konami-pop" mode="out-in">
            <div
                v-if="unlocked"
                key="unlocked"
                class="rainbow font-mono-chrome"
                style="font-size: 18px; font-weight: 700; letter-spacing: 0.5px"
            >
                🎉 30 free lives unlocked.
            </div>
            <div
                v-else
                key="locked"
                class="font-mono-chrome text-dim text-center"
                style="font-size: 12px; line-height: 1.9"
            >
                <div>listening for keydown…</div>
                <div style="color: #475569">↑ ↑ ↓ ↓ ← → ← → b a</div>
            </div>
        </Transition>

        <div class="flex gap-[6px] flex-wrap justify-center">
            <span
                v-for="(key, i) in KONAMI"
                :key="i"
                :style="{
                    width: '10px',
                    height: '10px',
                    borderRadius: '5px',
                    background: i < progress ? '#a3e635' : 'rgba(148,163,184,0.2)',
                }"
            />
        </div>

        <div class="flex gap-[6px] flex-wrap justify-center">
            <button
                v-for="pad in PAD"
                :key="pad.key"
                type="button"
                class="font-mono-chrome cursor-pointer text-text"
                style="font-size: 13px; min-width: 34px; padding: 6px 10px; background: rgba(34,211,238,0.08); border: 1px solid rgba(148,163,184,0.2)"
                @click="push(pad.key)"
            >{{ pad.label }}</button>
            <button
                v-if="unlocked"
                type="button"
                class="font-mono-chrome cursor-pointer text-dim"
                style="font-size: 11px; padding: 6px 10px; background: transparent; border: 1px solid rgba(148,163,184,0.14)"
                @click="reset"
            >reset</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const KONAMI = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a',
];

const PAD = [
    { key: 'ArrowUp', label: '↑' },
    { key: 'ArrowDown', label: '↓' },
    { key: 'ArrowLeft', label: '←' },
    { key: 'ArrowRight', label: '→' },
    { key: 'b', label: 'b' },
    { key: 'a', label: 'a' },
];

const unlocked = ref(false);
const buffer = ref<string[]>([]);

const progress = computed(() => {
    let matched = 0;
    for (const key of buffer.value) {
        matched = key === KONAMI[matched] ? matched + 1 : Number(key === KONAMI[0]);
    }
    return unlocked.value ? KONAMI.length : matched;
});

function push(key: string) {
    buffer.value = [...buffer.value, key].slice(-KONAMI.length);
    if (buffer.value.join() === KONAMI.join()) unlocked.value = true;
}

function reset() {
    unlocked.value = false;
    buffer.value = [];
}

function onKey(e: KeyboardEvent) {
    push(e.key);
}

onMounted(() => window.addEventListener('keydown', onKey));
onBeforeUnmount(() => window.removeEventListener('keydown', onKey));
</script>

<style scoped>
.rainbow {
    background: linear-gradient(90deg, #f472b6, #fbbf24, #a3e635, #22d3ee, #a78bfa);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}
.konami-pop-enter-active,
.konami-pop-leave-active {
    transition: opacity 0.2s ease, transform 0.24s cubic-bezier(0.22, 1, 0.36, 1);
}
.konami-pop-enter-from {
    opacity: 0;
    transform: scale(0.94);
}
.konami-pop-leave-to {
    opacity: 0;
    transform: scale(1.04);
}
</style>
