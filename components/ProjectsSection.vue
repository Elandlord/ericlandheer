<template>
    <section id="projects" class="relative py-24">
        <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div class="max-w-xl">
                <p class="font-mono text-xs uppercase tracking-[0.3em] text-accent">//&nbsp;Projects</p>
                <h2 class="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">Stuff I've been building.</h2>
            </div>

            <div class="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3" ref="gridRef">
                <a
                    v-for="project in projects"
                    :key="project.name"
                    :href="project.url"
                    target="_blank"
                    rel="noreferrer"
                    class="project-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-6 transition hover:border-accent/40"
                >
                    <div class="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />
                    <div class="relative">
                        <div class="flex items-center justify-between">
                            <h3 class="font-display text-xl font-semibold text-white">{{ project.name }}</h3>
                            <Icon name="ph:arrow-up-right-bold" class="h-5 w-5 text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                        </div>
                        <p class="mt-3 text-sm leading-relaxed text-slate-400">{{ project.description }}</p>
                    </div>
                    <div class="relative mt-6 flex flex-wrap gap-2">
                        <span
                            v-for="tag in project.tags"
                            :key="tag"
                            class="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-300 ring-1 ring-white/10"
                        >
                            {{ tag }}
                        </span>
                    </div>
                </a>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { projects } from '~/data/skills';

const gridRef = ref<HTMLElement | null>(null);

onMounted(async () => {
    if (typeof window === 'undefined' || !gridRef.value) return;
    const { default: gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(gridRef.value.children, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: gridRef.value, start: 'top 85%' },
    });
});
</script>
