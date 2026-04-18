<template>
    <section id="projects" class="relative py-24">
        <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div class="flex flex-wrap items-end justify-between gap-6" v-reveal>
                <div class="max-w-xl">
                    <p class="font-mono text-xs uppercase tracking-[0.3em] text-accent">//&nbsp;Open source</p>
                    <h2 class="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">Published packages.</h2>
                    <p class="mt-4 text-slate-300">Small, focused libraries I maintain publicly on GitHub.</p>
                </div>
                <a
                    href="https://github.com/Elandlord?tab=repositories"
                    target="_blank"
                    rel="noreferrer"
                    class="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/10 transition hover:bg-white/10"
                >
                    <Icon name="mdi:github" class="h-4 w-4" />
                    All repos
                </a>
            </div>

            <div v-if="pending" class="mt-12 grid gap-5 md:grid-cols-2">
                <div v-for="n in 2" :key="n" class="h-52 animate-pulse rounded-2xl border border-white/5 bg-white/[0.02]" />
            </div>

            <div v-else-if="!repos?.length" class="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center text-sm text-slate-400">
                Couldn't load repositories right now.
            </div>

            <div v-else class="mt-12 grid gap-5 md:grid-cols-2">
                <a
                    v-for="(repo, i) in repos"
                    :key="repo.name"
                    :href="repo.url"
                    target="_blank"
                    rel="noreferrer"
                    v-reveal="i * 60"
                    class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-7 transition hover:border-accent/40"
                >
                    <div class="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />
                    <div class="relative">
                        <div class="flex items-center justify-between gap-3">
                            <div class="flex items-center gap-3">
                                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                                    <Icon name="simple-icons:nats-dot-io" class="h-5 w-5 text-accent" />
                                </div>
                                <h3 class="font-display text-xl font-semibold text-white">{{ repo.name }}</h3>
                            </div>
                            <Icon name="ph:arrow-up-right-bold" class="h-5 w-5 shrink-0 text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                        </div>
                        <p v-if="repo.description" class="mt-4 text-sm leading-relaxed text-slate-300">{{ repo.description }}</p>
                    </div>
                    <div class="relative mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                        <span v-if="repo.language" class="inline-flex items-center gap-1.5">
                            <span class="h-2 w-2 rounded-full" :style="{ backgroundColor: languageColor(repo.language) }" />
                            {{ repo.language }}
                        </span>
                        <span v-if="repo.stars > 0" class="inline-flex items-center gap-1">
                            <Icon name="ph:star-fill" class="h-3.5 w-3.5" />
                            {{ repo.stars }}
                        </span>
                        <span class="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                            updated {{ relative(repo.pushedAt) }}
                        </span>
                    </div>
                </a>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { RepoSummary } from '~/server/api/repos.get';

const ALLOWLIST = ['nats-php-bundle', 'nats-php'];

const { data: repos, pending } = await useFetch<RepoSummary[]>('/api/repos', {
    default: () => [],
    key: 'gh-repos',
    transform: (items) => items.filter((r) => ALLOWLIST.includes(r.name)),
});

function languageColor(lang: string): string {
    const map: Record<string, string> = {
        TypeScript: '#3178c6',
        JavaScript: '#f1e05a',
        PHP: '#4F5D95',
        Vue: '#41b883',
        Go: '#00ADD8',
    };
    return map[lang] ?? '#94a3b8';
}

function relative(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime();
    const day = 86400000;
    if (diff < day) return 'today';
    if (diff < 7 * day) return `${Math.floor(diff / day)}d ago`;
    if (diff < 30 * day) return `${Math.floor(diff / (7 * day))}w ago`;
    if (diff < 365 * day) return `${Math.floor(diff / (30 * day))}mo ago`;
    return `${Math.floor(diff / (365 * day))}y ago`;
}
</script>
