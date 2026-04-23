<template>
    <div
        v-if="ready"
        class="font-mono-chrome text-dim inline-flex items-center gap-2 rounded-full border border-line"
        style="font-size: 11px; padding: 6px 11px; background: rgba(255,255,255,0.03)"
    >
        <span class="text-cyan">●</span>
        <span>{{ dateStr }}</span>
        <span style="color: #475569">·</span>
        <span class="text-head" style="font-variant-numeric: tabular-nums">{{ timeStr }}</span>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const ready = ref(false);
const dateStr = ref('');
const timeStr = ref('');
let timer: ReturnType<typeof setInterval> | null = null;

function tick() {
    const now = new Date();
    dateStr.value = now.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
    timeStr.value = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

onMounted(() => {
    tick();
    ready.value = true;
    timer = setInterval(tick, 1000);
});

onBeforeUnmount(() => {
    if (timer) clearInterval(timer);
});
</script>
