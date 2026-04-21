<template>
    <span>{{ text }}<span class="ml-[2px] text-pink" style="animation: blink 1s infinite">▋</span></span>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue';

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
    const cur = props.strings[idx.value % props.strings.length];
    if (!del.value && text.value === cur) {
        timer = setTimeout(() => {
            del.value = true;
            step();
        }, props.pause);
        return;
    }
    if (del.value && text.value === '') {
        del.value = false;
        idx.value += 1;
        step();
        return;
    }
    timer = setTimeout(
        () => {
            text.value = cur.slice(0, del.value ? text.value.length - 1 : text.value.length + 1);
            step();
        },
        del.value ? props.speed / 2 : props.speed,
    );
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
