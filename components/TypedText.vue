<template>
    <span>{{ text }}<span class="ml-[2px] text-pink" style="animation: blink 1s infinite">▋</span></span>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue';

import { nextTypedTextStep } from '~/utils/typedText';

const props = withDefaults(
    defineProps<{ strings: string[]; speed?: number; pause?: number }>(),
    { speed: 40, pause: 1600 },
);

const idx = ref(0);
const text = ref('');
const del = ref(false);
let timer: ReturnType<typeof setTimeout> | null = null;

function clear() {
    if (timer) clearTimeout(timer);
}

function step() {
    clear();
    const next = nextTypedTextStep(
        { text: text.value, del: del.value, idx: idx.value },
        props.strings,
        { speed: props.speed, pause: props.pause },
    );
    timer = setTimeout(() => {
        text.value = next.text;
        del.value = next.del;
        idx.value = next.idx;
        step();
    }, next.delayMs);
}

watch(
    () => props.strings,
    () => {
        text.value = '';
        del.value = false;
        idx.value = 0;
        step();
    },
    { immediate: true },
);

onBeforeUnmount(clear);
</script>
