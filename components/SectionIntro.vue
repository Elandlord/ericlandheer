<template>
    <div class="pb-[26px]">
        <div class="font-mono-chrome text-[12px] text-dim tracking-[0.6px] mb-[10px]">
            <span class="text-pink">$</span> cat ./{{ id }}.md
            <span class="text-dim">// {{ kicker }}</span>
        </div>
        <h2
            class="m-0 font-sans font-bold text-head leading-none"
            style="font-size: clamp(36px, 4.5vw, 60px); letter-spacing: -1px"
        >
            {{ title }}
        </h2>
    </div>
</template>

<script setup lang="ts">
defineProps<{ id: string; title: string; kicker: string }>();
</script>
