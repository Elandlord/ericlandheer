<template>
    <section id="skills" class="relative py-24">
        <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div class="flex items-end justify-between gap-6" v-reveal>
                <div class="max-w-xl">
                    <p class="font-mono text-xs uppercase tracking-[0.3em] text-accent">//&nbsp;Stack</p>
                    <h2 class="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">Things I reach for.</h2>
                    <p class="mt-4 text-slate-300">
                        A practical toolkit for backend systems, frontend products, cloud-native workflows, and performance-minded delivery.
                    </p>
                </div>
            </div>

            <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <article
                    v-for="(skill, i) in skills"
                    :key="skill.name"
                    v-reveal="i * 70"
                    class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20 hover:-translate-y-1"
                >
                    <div class="absolute inset-0 bg-gradient-to-br opacity-0 transition duration-500 group-hover:opacity-100" :class="skill.accent" />
                    <div class="relative">
                        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                            <Icon :name="skill.icon" class="h-6 w-6 text-white" />
                        </div>
                        <h3 class="mt-5 font-display text-lg font-semibold text-white">{{ skill.name }}</h3>
                        <p class="mt-2 text-sm leading-relaxed text-slate-400">{{ skill.blurb }}</p>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { skills } from '~/data/skills';
</script>
