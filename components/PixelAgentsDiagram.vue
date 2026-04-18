<template>
    <div>
        <div class="inline-flex rounded-full bg-white/5 p-0.5 ring-1 ring-white/10">
            <button
                v-for="variant in variants"
                :key="variant.id"
                type="button"
                class="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider transition"
                :class="active === variant.id ? 'bg-emerald-400/20 text-emerald-100 ring-1 ring-emerald-300/40' : 'text-slate-400 hover:text-white'"
                @click.stop.prevent="toggle(variant.id)"
            >
                {{ variant.label }}
            </button>
        </div>

        <div class="mt-3 [perspective:1400px]">
            <div
                class="relative h-56 w-full transition-transform duration-[700ms] [transform-style:preserve-3d]"
                :style="{ transform: active === 'office' ? 'rotateY(180deg)' : 'rotateY(0deg)' }"
            >
                <div class="absolute inset-0 overflow-hidden rounded-xl border border-white/10 bg-[#3f6a33] shadow-inner [backface-visibility:hidden]">
                    <img
                        :src="variants[0].src"
                        :alt="`Pixel Agents ${variants[0].label.toLowerCase()} screenshot`"
                        class="h-full w-full object-cover"
                        loading="lazy"
                        style="image-rendering: pixelated"
                    />
                </div>
                <div class="absolute inset-0 overflow-hidden rounded-xl border border-white/10 bg-[#3f2a33] shadow-inner [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <img
                        :src="variants[1].src"
                        :alt="`Pixel Agents ${variants[1].label.toLowerCase()} screenshot`"
                        class="h-full w-full object-cover"
                        loading="lazy"
                        style="image-rendering: pixelated"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const variants = [
    { id: 'village', label: 'Village', src: '/assets/images/pixel-agents-village.png' },
    { id: 'office', label: 'Office', src: '/assets/images/pixel-agents-office.png' },
] as const;

type VariantId = (typeof variants)[number]['id'];
const active = ref<VariantId>('village');

function toggle(id: VariantId) {
    active.value = id;
}
</script>
