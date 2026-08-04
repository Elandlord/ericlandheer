<template>
    <span style="font-variant-numeric: tabular-nums">{{ display }}{{ suffix }}</span>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { computeCountUpValue } from '~/utils/countUp';

const props = withDefaults(
    defineProps<{ to: number; duration?: number; suffix?: string }>(),
    { duration: 900, suffix: '' },
);

const display = ref(0);
let raf: number | null = null;

function animate() {
    if (raf) cancelAnimationFrame(raf);
    let start: number | null = null;
    const step = (t: number) => {
        if (start === null) start = t;
        const elapsed = t - start;
        display.value = computeCountUpValue(elapsed, props.duration, props.to);
        if (elapsed < props.duration) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
}

onMounted(animate);
onBeforeUnmount(() => {
    if (raf) cancelAnimationFrame(raf);
});
watch(() => props.to, animate);
</script>
