<template>
    <section class="max-w-[1200px] mx-auto px-4 md:px-6 relative z-[2]" style="margin-top: 22px">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-[10px]">
            <div
                v-for="(s, i) in stats"
                :key="s.label"
                class="relative overflow-hidden"
                :style="{
                    padding: '14px 16px',
                    background: 'rgba(10,15,31,0.6)',
                    border: '1px solid rgba(148,163,184,0.14)',
                    borderLeft: `2px solid ${s.color}`,
                    backdropFilter: 'blur(8px)',
                    animation: `slide-in-up .5s ${i * 0.06}s both`,
                }"
            >
                <div
                    class="font-mono-chrome text-dim uppercase flex items-center gap-[6px]"
                    style="font-size: 10px; letter-spacing: 1.2px; margin-bottom: 6px"
                >
                    <span :style="{ color: s.color, fontSize: '12px' }">{{ s.glyph }}</span>
                    {{ s.label }}
                </div>
                <div
                    class="font-sans font-bold text-head"
                    style="font-size: 32px; line-height: 1; letter-spacing: -1px"
                >
                    <CountUp :to="s.value" :suffix="s.suffix || ''" />
                </div>
                <div
                    class="absolute left-0 right-0"
                    style="bottom: 0; height: 1px"
                    :style="{ background: `linear-gradient(90deg, ${s.color}, transparent)` }"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { JOBS, LAB, PACKAGES, SKILLS, TIMELINE } from '~/data/site';

interface Stat {
    label: string;
    value: number;
    suffix?: string;
    color: string;
    glyph: string;
}

const stats: Stat[] = [
    { label: 'yrs shipping', value: 10, suffix: '+', color: '#22d3ee', glyph: '◆' },
    { label: 'companies', value: JOBS.length, color: '#a78bfa', glyph: '◼' },
    { label: 'skills', value: SKILLS.length, color: '#f472b6', glyph: '⇆' },
    { label: 'lab experiments', value: LAB.length, color: '#fbbf24', glyph: '◌' },
    { label: 'oss packages', value: PACKAGES.length, color: '#a3e635', glyph: '↑' },
    { label: 'timeline entries', value: TIMELINE.length, color: '#67e8f9', glyph: '●' },
];

</script>
