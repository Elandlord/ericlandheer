<template>
    <section id="experience" class="relative py-24">
        <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div class="max-w-xl" v-reveal>
                <p class="font-mono text-xs uppercase tracking-[0.3em] text-accent">//&nbsp;Career</p>
                <h2 class="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">The road so far.</h2>
            </div>

            <ol class="relative mt-12 space-y-6 before:absolute before:left-6 before:top-4 before:bottom-4 before:w-px before:bg-gradient-to-b before:from-accent/50 before:via-white/10 before:to-transparent">
                <li
                    v-for="(item, i) in timeline"
                    :key="`${item.company}-${item.from}`"
                    v-reveal="i * 80"
                    class="relative pl-16"
                >
                    <span
                        class="absolute left-3 top-6 flex h-6 w-6 items-center justify-center rounded-full bg-ink-950 ring-2"
                        :class="item.upcoming ? 'ring-fuchsia-400/80' : 'ring-accent/70'"
                    >
                        <span class="h-2 w-2 rounded-full" :class="item.upcoming ? 'bg-fuchsia-400' : 'bg-accent'" />
                    </span>
                    <article class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20">
                        <div class="flex items-center gap-4">
                            <CompanyLogo :src="item.image" :name="item.company" />
                            <div class="flex flex-wrap items-center gap-2">
                                <span
                                    class="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ring-1"
                                    :class="badgeClass(item)"
                                >
                                    {{ item.upcoming ? 'Upcoming' : item.type === 'work' ? 'Work' : 'Education' }}
                                </span>
                                <span class="font-mono text-xs text-slate-500">{{ formatPeriod(item.from, item.until) }}</span>
                            </div>
                        </div>
                        <div class="mt-5">
                            <h3 class="font-display text-xl font-semibold text-white">{{ item.title }}</h3>
                            <p class="text-sm text-slate-400">{{ item.company }} · {{ item.city }}</p>
                            <p class="mt-3 text-sm leading-relaxed text-slate-300">{{ item.description }}</p>
                        </div>
                    </article>
                </li>
            </ol>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { jobs, education, formatPeriod, type ExperienceItem } from '~/data/experience';

const timeline = computed<ExperienceItem[]>(() => {
    return [...jobs, ...education].sort((a, b) => {
        const aKey = a.upcoming ? Number.POSITIVE_INFINITY : a.until ? new Date(a.until).getTime() : Date.now();
        const bKey = b.upcoming ? Number.POSITIVE_INFINITY : b.until ? new Date(b.until).getTime() : Date.now();
        return bKey - aKey;
    });
});

function badgeClass(item: ExperienceItem) {
    if (item.upcoming) return 'bg-fuchsia-500/15 text-fuchsia-100 ring-fuchsia-400/40';
    if (item.type === 'work') return 'bg-accent/15 text-accent-soft ring-accent/30';
    return 'bg-violet-500/15 text-violet-200 ring-violet-500/30';
}
</script>
