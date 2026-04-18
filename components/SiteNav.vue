<template>
    <header
        class="fixed inset-x-0 top-0 z-40 transition-all duration-300"
        :class="scrolled ? 'backdrop-blur-xl bg-ink-950/60 border-b border-white/5' : ''"
    >
        <nav class="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <NuxtLink to="/" class="group flex items-center gap-2 font-display text-lg font-bold tracking-tight">
                <span class="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-indigo-500 text-ink-950 shadow-lg shadow-accent/30 transition group-hover:scale-110">
                    EL
                </span>
                <span class="hidden sm:inline text-white">Eric Landheer</span>
            </NuxtLink>

            <ul class="flex items-center gap-1 text-sm">
                <li v-for="link in links" :key="link.href">
                    <a
                        :href="link.href"
                        class="rounded-full px-3 py-1.5 text-slate-300 transition hover:bg-white/5 hover:text-white"
                    >
                        {{ link.label }}
                    </a>
                </li>
                <li>
                    <a
                        href="https://github.com/Elandlord"
                        target="_blank"
                        rel="noreferrer"
                        class="ml-2 inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-slate-200 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white"
                    >
                        <Icon name="mdi:github" class="h-4 w-4" />
                        GitHub
                    </a>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const scrolled = ref(false);
const links = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#lab', label: 'Lab' },
    { href: '#projects', label: 'Projects' },
];

const onScroll = () => {
    scrolled.value = window.scrollY > 24;
};

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }));
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll));
</script>
