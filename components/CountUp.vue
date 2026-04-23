<template>
    <span style="font-variant-numeric: tabular-nums">{{ display }}{{ suffix }}</span>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

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
        const p = Math.min(1, (t - start) / props.duration);
        const eased = 1 - Math.pow(1 - p, 3);
        display.value = Math.round(props.to * eased);
        if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
}

onMounted(animate);
onBeforeUnmount(() => {
    if (raf) cancelAnimationFrame(raf);
});
watch(() => props.to, animate);
</script>
