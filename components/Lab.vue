<template>
    <div id="lab" class="max-w-[1200px] mx-auto px-4 md:px-6 relative z-[2]" style="margin-top: 100px">
        <div class="reveal">
            <SectionIntro id="lab" kicker="side projects · won't be products" title="The lab." />
            <DockerFrame>
                <div
                    class="font-mono-chrome hidden md:grid"
                    style="font-size:11px;color:#64748b;letter-spacing:1.2px;padding:10px 18px;border-bottom:1px solid rgba(148,163,184,0.14);background:rgba(17,24,39,0.3);grid-template-columns:40px 1fr 90px 120px 90px;gap:16px;text-transform:uppercase"
                >
                    <span>#</span><span>service</span><span>status</span><span>ports</span><span>uptime</span>
                </div>
                <div class="px-3 md:px-[18px]" style="padding-bottom: 24px">
                    <p
                        class="font-sans text-text"
                        style="margin:14px 0 22px;font-size:15px;line-height:1.7;max-width:720px"
                    >
                        What I'm building when nobody's asking. LLM agents, RAG over my notes, pixel villages. Giving the models something interesting to do. Each container runs on my homelab.
                    </p>
                    <div class="grid gap-[14px] grid-cols-1 md:grid-cols-2">
                        <div
                            v-for="(p, i) in LAB"
                            :key="p.title"
                            class="relative overflow-hidden border border-line"
                            :style="cardStyle(i)"
                            @mouseenter="open = i"
                            @mouseleave="open = null"
                        >
                            <div
                                class="absolute left-0 right-0 top-0"
                                :style="{ height: '2px', background: colors[i % colors.length], opacity: open === i ? 1 : 0.45, transition: 'opacity .25s' }"
                            />
                            <div
                                class="font-mono-chrome grid items-center text-text grid-cols-[28px_1fr_auto] md:grid-cols-[40px_1fr_90px_120px_90px] gap-3 md:gap-4"
                                style="font-size:11.5px;padding:12px 14px 10px;border-bottom:1px dashed rgba(148,163,184,0.14)"
                            >
                                <span class="text-dim">{{ String(i + 1).padStart(2, '0') }}</span>
                                <span class="flex items-center gap-2 min-w-0">
                                    <span
                                        class="grid place-items-center shrink-0"
                                        :style="{
                                            width: '18px',
                                            height: '18px',
                                            background: colors[i % colors.length] + '22',
                                            color: colors[i % colors.length],
                                            fontSize: '11px',
                                            border: `1px solid ${colors[i % colors.length]}66`,
                                        }"
                                    >{{ p.glyph }}</span>
                                    <span class="text-head truncate">{{ p.title.toLowerCase().replace(/\s+/g, '-') }}</span>
                                </span>
                                <span class="text-lime flex items-center gap-[5px]">
                                    <span
                                        style="width:6px;height:6px;border-radius:3px;background:#a3e635;box-shadow:0 0 8px #a3e635"
                                    />
                                    Up
                                </span>
                                <span class="text-cyan hidden md:inline">{{ ports[i % 8] }}</span>
                                <span class="text-dim hidden md:inline">{{ uptimes[i % 8] }}</span>
                            </div>
                            <div style="padding: 16px 16px 18px">
                                <h3
                                    class="font-sans font-semibold text-head"
                                    style="margin: 0 0 8px; font-size: 17px"
                                >{{ p.title }}</h3>
                                <p
                                    class="font-sans text-text m-0"
                                    style="font-size: 13.5px; line-height: 1.55"
                                >{{ p.desc }}</p>
                                <div v-if="/pixel/i.test(p.title)" style="margin-top: 14px">
                                    <PixelAgentsToggle />
                                </div>
                                <div class="flex flex-wrap gap-[6px]" style="margin-top: 14px">
                                    <span
                                        v-for="t in p.tags"
                                        :key="t"
                                        class="font-mono-chrome text-dim"
                                        style="font-size:10px;padding:2px 7px;border:1px solid rgba(148,163,184,0.14)"
                                    >{{ t }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DockerFrame>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { LAB } from '~/data/site';

const open = ref<number | null>(null);
const colors = ['#22d3ee', '#a78bfa', '#f472b6', '#fbbf24', '#a3e635', '#22d3ee', '#a78bfa', '#f472b6'];
const ports = ['8080:80', '5173:5173', '3000:3000', '4222:4222', '11434:11434', '6379:6379', '7700:7700', '8000:8000'];
const uptimes = ['3d 14h', '21d 2h', '7d 9h', '42d 1h', '6h 22m', '88d 5h', '2d 18h', '14d 4h'];

function cardStyle(i: number) {
    const col = colors[i % colors.length];
    const isOpen = open.value === i;
    return {
        background: isOpen ? `${col}10` : 'rgba(3,6,17,0.55)',
        transition: 'all .25s',
        transform: isOpen ? 'translateY(-3px)' : 'none',
        boxShadow: isOpen ? `0 14px 40px -15px ${col}55` : 'none',
    };
}
</script>
