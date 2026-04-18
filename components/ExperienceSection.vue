<template>
    <section id="experience" class="relative py-24">
        <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div class="max-w-xl">
                <p class="font-mono text-xs uppercase tracking-[0.3em] text-accent">//&nbsp;Career</p>
                <h2 class="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">The road so far.</h2>
            </div>

            <ol class="relative mt-12 space-y-6 before:absolute before:left-6 before:top-4 before:bottom-4 before:w-px before:bg-gradient-to-b before:from-accent/50 before:via-white/10 before:to-transparent" ref="listRef">
                <li
                    v-for="item in timeline"
                    :key="`${item.company}-${item.from}`"
                    class="timeline-item relative pl-16"
                >
                    <span class="absolute left-3 top-6 flex h-6 w-6 items-center justify-center rounded-full bg-ink-950 ring-2 ring-accent/70">
                        <span class="h-2 w-2 rounded-full bg-accent" />
                    </span>
                    <article class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20">
                        <div class="flex flex-wrap items-start gap-5">
                            <img :src="item.image" :alt="`${item.company} logo`" class="h-14 w-14 shrink-0 rounded-xl bg-white/5 object-contain p-2 ring-1 ring-white/10" />
                            <div class="min-w-0 flex-1">
                                <div class="flex flex-wrap items-center gap-2">
                                    <span
                                        class="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1"
                                        :class="item.type === 'work' ? 'bg-accent/15 text-accent-soft ring-accent/30' : 'bg-fuchsia-500/15 text-fuchsia-200 ring-fuchsia-500/30'"
                                    >
                                        {{ item.type === 'work' ? 'Work' : 'Education' }}
                                    </span>
                                    <span class="font-mono text-xs text-slate-500">{{ formatPeriod(item.from, item.until) }}</span>
                                </div>
                                <h3 class="mt-2 font-display text-xl font-semibold text-white">{{ item.title }}</h3>
                                <p class="text-sm text-slate-400">{{ item.company }} · {{ item.city }}</p>
                                <p class="mt-3 text-sm leading-relaxed text-slate-300">{{ item.description }}</p>
                            </div>
                        </div>
                    </article>
                </li>
            </ol>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { jobs, education, formatPeriod } from '~/data/experience';

const listRef = ref<HTMLElement | null>(null);

const timeline = computed(() => {
    return [...jobs, ...education].sort((a, b) => {
        const aEnd = a.until ? new Date(a.until).getTime() : Date.now() + 1;
        const bEnd = b.until ? new Date(b.until).getTime() : Date.now() + 1;
        return bEnd - aEnd;
    });
});

onMounted(async () => {
    if (typeof window === 'undefined' || !listRef.value) return;
    const { default: gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray<HTMLElement>('.timeline-item').forEach((el) => {
        gsap.from(el, {
            x: -30,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
        });
    });
});
</script>
