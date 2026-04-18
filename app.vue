<template>
    <div class="relative min-h-screen overflow-x-hidden mesh-bg">
        <div class="pointer-events-none fixed inset-0 grid-lines opacity-40" />
        <SiteNav />
        <NuxtPage />
        <SiteFooter />
    </div>
</template>

<script setup lang="ts">
// Smooth scroll + ScrollTrigger wiring lives in plugins/smooth-scroll.client.ts
</script>
