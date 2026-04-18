<template>
    <div
        v-if="!src"
        class="flex h-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br px-3 text-sm font-semibold ring-1 ring-white/10"
        :class="gradient"
    >
        {{ initials }}
    </div>
    <img
        v-else
        :src="src"
        :alt="`${name} logo`"
        class="h-10 w-auto shrink-0 max-w-[140px] object-contain"
    />
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    src: string | null;
    name: string;
}>();

const initials = computed(() =>
    props.name
        .split(/\s+/)
        .map((w) => w[0])
        .join('')
        .slice(0, 3)
        .toUpperCase(),
);

const gradient = computed(() => {
    let hash = 0;
    for (let i = 0; i < props.name.length; i++) hash = (hash * 31 + props.name.charCodeAt(i)) >>> 0;
    const palette = [
        'from-cyan-400/30 to-indigo-500/20 text-cyan-100',
        'from-fuchsia-400/30 to-pink-500/20 text-fuchsia-100',
        'from-emerald-400/30 to-teal-500/20 text-emerald-100',
        'from-amber-400/30 to-orange-500/20 text-amber-100',
        'from-violet-400/30 to-purple-500/20 text-violet-100',
    ];
    return palette[hash % palette.length];
});
</script>
