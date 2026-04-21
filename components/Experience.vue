<template>
    <div id="experience" class="max-w-[1200px] mx-auto px-6 relative z-[2]" style="margin-top: 100px">
        <div class="reveal">
            <SectionIntro id="experience" kicker="chronological, newest first" title="Where I've built." />
            <GitLogFrame>
                <div class="font-mono-chrome" style="font-size: 13px">
                    <div
                        v-for="(j, idx) in TIMELINE"
                        :key="idx"
                        class="grid items-start gap-[10px] py-[10px]"
                        style="grid-template-columns: 24px 1fr"
                    >
                        <div class="relative min-h-[60px] flex flex-col items-center">
                            <span
                                v-if="idx > 0"
                                class="absolute"
                                style="top:0;bottom:calc(50% + 6px);width:2px;background:rgba(148,163,184,0.14)"
                            />
                            <span
                                v-if="idx < TIMELINE.length - 1"
                                class="absolute"
                                style="top:calc(50% + 6px);bottom:0;width:2px;background:rgba(148,163,184,0.14)"
                            />
                            <span
                                class="relative z-[1]"
                                :style="dotStyle(j)"
                            />
                        </div>
                        <div
                            class="py-2 pb-[18px]"
                            :style="{ borderBottom: idx < TIMELINE.length - 1 ? '1px dashed rgba(148,163,184,0.14)' : 'none' }"
                        >
                            <div class="flex items-baseline gap-[10px] flex-wrap">
                                <span class="text-amber">{{ hashes[idx] || 'commit00' }}</span>
                                <span class="text-dim">(</span>
                                <template v-if="j.upcoming">
                                    <span class="text-amber">HEAD →</span>
                                    <span class="text-pink">simplicate</span>
                                </template>
                                <template v-else-if="idx === 1">
                                    <span class="text-cyan">peterprint</span>
                                </template>
                                <template v-else-if="idx > 1">
                                    <span class="text-dim">tag: v{{ TIMELINE.length - idx }}.0</span>
                                </template>
                                <span class="text-dim">)</span>
                                <span class="text-dim">Author:</span>
                                <span class="text-text">Eric Landheer</span>
                                <span class="text-dim">·</span>
                                <span class="text-dim">{{ fmtPeriod(j.from, j.until) }}</span>
                            </div>
                            <div class="flex items-center gap-[10px] flex-wrap" style="margin-top: 10px">
                                <h3
                                    class="m-0 font-sans font-semibold text-head"
                                    style="font-size: 19px"
                                >{{ j.title }}</h3>
                                <span class="text-dim">@</span>
                                <span
                                    class="font-sans font-medium"
                                    :style="{ fontSize: '16px', color: j.upcoming ? '#fbbf24' : '#22d3ee' }"
                                >{{ j.company }}</span>
                                <span
                                    class="font-mono-chrome"
                                    :style="pillStyle(j.type)"
                                >{{ pillLabel(j.type) }}</span>
                                <span
                                    v-if="j.upcoming"
                                    class="font-mono-chrome"
                                    style="font-size:10.5px;padding:3px 8px;color:#fbbf24;background:#fbbf2411;border:1px solid #fbbf2455;letter-spacing:1px"
                                >UPCOMING · JUN 2026</span>
                                <a
                                    v-if="j.url"
                                    :href="j.url"
                                    target="_blank"
                                    rel="noopener"
                                    class="font-mono-chrome no-underline inline-flex items-center gap-[4px]"
                                    style="font-size:10.5px;padding:3px 8px;color:#22d3ee;background:rgba(34,211,238,0.06);border:1px solid rgba(34,211,238,0.35);letter-spacing:1px"
                                >
                                    <span>↗</span> {{ j.type === 'certification' ? 'VERIFY' : 'VISIT' }}
                                </a>
                            </div>
                            <div
                                class="font-mono-chrome text-dim flex gap-3"
                                style="font-size: 12px; margin-top: 4px"
                            >
                                <span>📍 {{ j.city }}</span>
                            </div>
                            <p
                                class="font-sans text-text"
                                style="margin: 10px 0 0; font-size: 14px; line-height: 1.6; max-width: 780px"
                            >{{ j.description }}</p>
                        </div>
                    </div>
                </div>
            </GitLogFrame>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TIMELINE, fmtPeriod, type Job } from '~/data/site';

const hashes = ['c0ffee1','9b4ac3a','5e21110','a1b4e2c','f93c0aa','4d3a872','8cf1102','2e7b6d1','73abcd0','19bd002','dfa8821','1a2b3c4'];

function typeColor(j: Job): string {
    if (j.upcoming) return '#fbbf24';
    if (j.type === 'work') return '#22d3ee';
    if (j.type === 'school') return '#a78bfa';
    return '#f472b6';
}

function dotStyle(j: Job) {
    const col = typeColor(j);
    return {
        marginTop: '20px',
        width: '13px',
        height: '13px',
        borderRadius: '7px',
        background: col,
        boxShadow: j.upcoming ? `0 0 0 4px #fbbf2422, 0 0 14px #fbbf24` : `0 0 0 3px #050814`,
        border: `2px solid ${col}`,
        position: 'relative' as const,
    };
}

function pillLabel(t: Job['type']) {
    if (t === 'school') return 'EDU';
    if (t === 'certification') return 'CERT';
    return 'WORK';
}
function pillStyle(t: Job['type']) {
    const map: Record<Job['type'], string> = {
        work: '#22d3ee',
        school: '#a78bfa',
        certification: '#fbbf24',
    };
    const c = map[t];
    return {
        fontSize: '10px',
        letterSpacing: '1.2px',
        padding: '3px 7px',
        color: c,
        border: `1px solid ${c}55`,
        background: `${c}11`,
    };
}
</script>
