<template>
    <span aria-hidden="true">
        <span class="absolute" :style="styleFor('tl')" />
        <span class="absolute" :style="styleFor('tr')" />
        <span class="absolute" :style="styleFor('bl')" />
        <span class="absolute" :style="styleFor('br')" />
    </span>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';

const props = withDefaults(defineProps<{ color?: string; size?: number }>(), {
    color: '#22d3ee',
    size: 14,
});

function styleFor(corner: 'tl' | 'tr' | 'bl' | 'br'): CSSProperties {
    const base: CSSProperties = {
        width: `${props.size}px`,
        height: `${props.size}px`,
        borderStyle: 'solid',
        borderColor: props.color,
        borderWidth: '0',
        opacity: 0.7,
        pointerEvents: 'none',
    };
    if (corner === 'tl') return { ...base, top: '-1px', left: '-1px', borderTopWidth: '2px', borderLeftWidth: '2px' };
    if (corner === 'tr') return { ...base, top: '-1px', right: '-1px', borderTopWidth: '2px', borderRightWidth: '2px' };
    if (corner === 'bl') return { ...base, bottom: '-1px', left: '-1px', borderBottomWidth: '2px', borderLeftWidth: '2px' };
    return { ...base, bottom: '-1px', right: '-1px', borderBottomWidth: '2px', borderRightWidth: '2px' };
}
</script>
