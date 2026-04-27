<template>
    <section class="max-w-[1200px] mx-auto px-4 md:px-6 relative z-[2]" style="margin-top: 24px">
        <div class="border border-line" style="background: rgba(3,6,17,0.55)">
            <Ticker :items="items" />
        </div>
    </section>
</template>

<script setup lang="ts">
const items = [
    { delta: '◆', text: 'based in Groningen, NL', color: '#22d3ee' },
    { delta: '→', text: 'starting at Simplicate · Jun 2026', color: '#fbbf24' },
    { delta: '✓', text: '10+ years shipping', color: '#a3e635' },
    { delta: '●', text: '8 lab experiments running', color: '#a78bfa' },
    { delta: '⇆', text: '2 OSS packages maintained', color: '#f472b6' },
    { delta: '◌', text: 'reply time: usually same-day, CET', color: '#67e8f9' },
    { delta: '⎇', text: 'main · clean working tree', color: '#a3e635' },
];
</script>
