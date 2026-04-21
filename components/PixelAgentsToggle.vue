<template>
    <div
        class="relative w-full overflow-hidden"
        style="aspect-ratio: 16 / 10; border: 1px solid rgba(148,163,184,0.18); background: #3f6a33"
    >
        <Transition name="pixel-swap">
            <img
                :key="view"
                :src="`/assets/images/pixel-agents-${view}.png`"
                alt=""
                class="absolute inset-0 block w-full h-full object-cover"
                style="image-rendering: pixelated"
            />
        </Transition>
        <div
            class="absolute flex gap-1"
            style="top: 8px; left: 8px; background: rgba(0,0,0,0.5); padding: 3px; border-radius: 4px"
        >
            <button
                v-for="o in options"
                :key="o.id"
                type="button"
                class="font-mono-chrome cursor-pointer"
                :style="{
                    fontSize: '10px',
                    padding: '3px 8px',
                    background: view === o.id ? 'rgba(163,230,53,0.25)' : 'transparent',
                    color: view === o.id ? '#d9f99d' : '#cbd5e1',
                    border: `1px solid ${view === o.id ? 'rgba(163,230,53,0.5)' : 'transparent'}`,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    borderRadius: '2px',
                }"
                @click="view = o.id"
            >{{ o.label }}</button>
        </div>
        <div
            class="absolute font-mono-chrome"
            style="bottom:8px;right:8px;font-size:9.5px;color:#cbd5e1;background:rgba(0,0,0,0.55);padding:3px 7px;border-radius:2px;letter-spacing:0.5px"
        >live screenshot</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type View = 'village' | 'office';
const view = ref<View>('village');
const options: { id: View; label: string }[] = [
    { id: 'village', label: 'Village' },
    { id: 'office', label: 'Office' },
];
</script>

<style scoped>
.pixel-swap-enter-active,
.pixel-swap-leave-active {
    transition: opacity 0.35s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.pixel-swap-enter-from {
    opacity: 0;
    transform: scale(1.04);
}
.pixel-swap-leave-to {
    opacity: 0;
    transform: scale(0.97);
}
.pixel-swap-leave-active {
    position: absolute;
    inset: 0;
}
</style>
