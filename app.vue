<template>
    <div class="relative min-h-screen overflow-x-hidden mesh-bg">
        <div class="pointer-events-none fixed inset-0 grid-lines opacity-40" />
        <SiteNav />
        <NuxtPage />
        <SiteFooter />
    </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';

let lenis: any = null;

onMounted(async () => {
    if (typeof window === 'undefined') return;
    const { default: Lenis } = await import('lenis');
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
});

onBeforeUnmount(() => {
    lenis?.destroy();
});
</script>
