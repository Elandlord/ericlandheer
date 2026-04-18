<template>
    <main class="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-32">
        <div class="max-w-xl text-center">
            <p class="font-mono text-xs uppercase tracking-[0.3em] text-pink-300">//&nbsp;Traditie</p>
            <h1 class="mt-3 font-display text-4xl font-black tracking-tight text-white sm:text-5xl">
                Een <span class="text-gradient">{{ dayLabel }}</span> glitterplaatje
            </h1>
            <p class="mt-4 text-slate-300">Vers geplukt van deelplaatjes.nl. Gewoon, omdat het kan.</p>
        </div>

        <div class="mt-10 w-full max-w-md">
            <div v-if="pending" class="flex h-80 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.02]">
                <Icon name="svg-spinners:blocks-shuffle-3" class="h-10 w-10 text-pink-300" />
            </div>
            <div v-else-if="error || !data?.image" class="flex h-80 flex-col items-center justify-center rounded-3xl border border-pink-500/30 bg-pink-500/5 p-6 text-center">
                <Icon name="ph:cloud-warning-bold" class="h-10 w-10 text-pink-300" />
                <p class="mt-3 text-sm text-pink-100">Geen {{ dayLabel }} glitterplaatje gevonden :(</p>
                <button
                    class="mt-5 rounded-full bg-pink-500/20 px-4 py-2 text-xs font-semibold text-pink-50 ring-1 ring-pink-400/40 transition hover:bg-pink-500/30"
                    @click="refresh()"
                >
                    Probeer opnieuw
                </button>
            </div>
            <figure v-else class="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-2 shadow-2xl shadow-pink-500/20">
                <img :src="data.image" :alt="data.title ?? 'Glitterplaatje'" class="w-full rounded-2xl" />
                <figcaption v-if="data.title" class="mt-3 px-2 pb-2 text-center text-xs text-slate-400">{{ data.title }}</figcaption>
            </figure>

            <div class="mt-6 flex justify-center gap-2">
                <button
                    class="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/10 transition hover:bg-white/10"
                    @click="refresh()"
                >
                    <Icon name="ph:shuffle-bold" class="h-3.5 w-3.5" />
                    Nieuwe plaatje
                </button>
                <NuxtLink
                    to="/"
                    class="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/10 transition hover:bg-white/10"
                >
                    <Icon name="ph:arrow-left-bold" class="h-3.5 w-3.5" />
                    Terug
                </NuxtLink>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
const DAYS_NL = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];
const dayLabel = DAYS_NL[new Date().getDay()];

const { data, pending, error, refresh } = await useFetch<{ image: string; title: string | null }>('/api/glitterplaatje', {
    server: false,
    lazy: true,
});

useHead({ title: `Een ${dayLabel} glitterplaatje — Eric Landheer` });
</script>
