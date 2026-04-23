<template>
    <div
        class="overflow-hidden"
        style="
            border-top: 1px solid rgba(148,163,184,0.14);
            padding: 9px 0;
            background: rgba(3,6,17,0.5);
            -webkit-mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
            mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
        "
    >
        <div
            class="flex whitespace-nowrap font-mono-chrome"
            style="gap: 32px; font-size: 11.5px; width: max-content; animation: ticker 40s linear infinite"
        >
            <span
                v-for="(it, i) in doubled"
                :key="i"
                class="inline-flex items-center gap-2"
            >
                <span :style="{ color: it.color, fontWeight: 700 }">{{ it.delta }}</span>
                <span class="text-text">{{ it.text }}</span>
                <span style="color: #475569">·</span>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Item {
    delta: string;
    text: string;
    color: string;
}

const props = defineProps<{ items: Item[] }>();

const doubled = computed(() => [...props.items, ...props.items]);
</script>
