<template>
    <section id="lab" class="relative py-24">
        <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl" v-reveal>
                <p class="font-mono text-xs uppercase tracking-[0.3em] text-accent">//&nbsp;Lab</p>
                <h2 class="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">Currently building.</h2>
                <p class="mt-4 text-slate-300">Side projects that keep me sharp. Mostly about giving large language models something interesting to do.</p>
            </div>

            <div
                v-reveal="80"
                class="mt-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-accent/5 via-violet-500/5 to-transparent p-6 sm:flex-row sm:items-center"
            >
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-indigo-500 text-ink-950 shadow-lg shadow-accent/30">
                    <Icon name="ph:target-bold" class="h-6 w-6" />
                </div>
                <div>
                    <p class="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">North star</p>
                    <p class="mt-1 font-display text-lg font-semibold text-white">A fully automated agent setup that builds my projects for me.</p>
                    <p class="mt-1 text-sm leading-relaxed text-slate-300">
                        Everything below is a piece of the same puzzle: durable memory, a shared task API, tools that navigate my notes, and worlds where agents can collaborate. The end state is a self-driving lab where I brief the agents and they ship.
                    </p>
                </div>
            </div>

            <div class="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                <article
                    v-for="(item, i) in items"
                    :key="item.title"
                    v-reveal="i * 60"
                    class="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-6 transition hover:border-white/20"
                    :class="item.span"
                >
                    <div
                        class="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full blur-3xl opacity-0 transition duration-500 group-hover:opacity-100"
                        :class="item.glow"
                    />
                    <div class="relative">
                        <div class="flex items-center gap-3">
                            <div
                                class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10"
                                :class="item.iconColor"
                            >
                                <Icon :name="item.icon" class="h-5 w-5" />
                            </div>
                            <h3 class="font-display text-lg font-semibold text-white">{{ item.title }}</h3>
                        </div>
                        <p class="mt-3 text-sm leading-relaxed text-slate-300">{{ item.description }}</p>
                    </div>

                    <div class="relative mt-5 flex-1">
                        <component :is="item.diagram" />
                    </div>

                    <div class="relative mt-5 flex flex-wrap gap-1.5">
                        <span
                            v-for="tag in item.tags"
                            :key="tag"
                            class="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-300 ring-1 ring-white/10"
                        >
                            {{ tag }}
                        </span>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { h, type Component } from 'vue';
import PixelAgentsDiagram from '~/components/PixelAgentsDiagram.vue';

interface LabItem {
    title: string;
    description: string;
    icon: string;
    iconColor: string;
    glow: string;
    span: string;
    tags: string[];
    diagram: Component;
}

const DiagramClaudeDashboard: Component = {
    render() {
        return h('div', { class: 'rounded-xl border border-white/10 bg-ink-950/60 p-4 font-mono text-[11px] text-slate-300' }, [
            h('div', { class: 'flex items-center justify-between' }, [
                h('span', { class: 'rounded bg-accent/15 px-2 py-0.5 text-accent-soft' }, 'runner'),
                h('span', { class: 'text-slate-500' }, '── polls ──▶'),
                h('span', { class: 'rounded bg-violet-400/15 px-2 py-0.5 text-violet-200' }, 'api'),
            ]),
            h('div', { class: 'my-2 h-px bg-white/5' }),
            h('div', { class: 'flex items-center justify-between' }, [
                h('span', { class: 'rounded bg-pink-400/15 px-2 py-0.5 text-pink-200' }, 'dashboard'),
                h('span', { class: 'text-slate-500' }, '◀── renders ──'),
                h('span', { class: 'text-slate-500' }, 'tasks'),
            ]),
        ]);
    },
};

const DiagramLocalBrain: Component = {
    render() {
        const dot = (color: string) =>
            h('span', { class: `inline-block h-1.5 w-1.5 rounded-full ${color}` });
        return h('div', { class: 'rounded-xl border border-white/10 bg-black/60 p-3' }, [
            h('div', { class: 'flex items-center justify-center gap-3 text-[9px] text-slate-400' }, [
                h('span', { class: 'inline-flex items-center gap-1' }, [dot('bg-emerald-400'), 'Online']),
                h('span', { class: 'inline-flex items-center gap-1' }, [dot('bg-emerald-400'), 'qwen3:8b']),
                h('span', { class: 'text-slate-500' }, '573 files'),
                h('span', { class: 'text-slate-500' }, '3626 chunks'),
            ]),
            h('div', { class: 'mt-2 flex justify-center' }, [
                h('div', { class: 'inline-flex rounded-full bg-white/5 p-0.5 text-[9px]' }, [
                    h('span', { class: 'rounded-full px-2 py-0.5 text-slate-400' }, 'Search'),
                    h('span', { class: 'rounded-full bg-violet-500 px-2 py-0.5 text-white' }, 'Ask'),
                ]),
            ]),
            h('div', { class: 'mt-2 rounded-md bg-white/5 px-2 py-1.5 text-[10px] text-slate-300' }, 'What did I do last week?'),
            h('div', { class: 'mt-2 text-[10px] leading-snug text-slate-400' }, [
                h('span', null, 'You worked on the Claude Dashboard '),
                h('span', { class: 'text-violet-300' }, '[04-07 log]'),
                h('span', null, ', refactored code, shipped a new logo.'),
            ]),
        ]);
    },
};

const DiagramZettelkasten: Component = {
    render() {
        function rand(seed: number) {
            let s = seed;
            return () => {
                s = (s * 9301 + 49297) % 233280;
                return s / 233280;
            };
        }
        const r = rand(42);
        const W = 240;
        const H = 130;
        const home = { x: 145, y: 62 };

        const fanNotes = Array.from({ length: 16 }, (_, i) => {
            const a = -Math.PI / 3 + (i / 15) * (Math.PI * 1.3);
            const dist = 18 + r() * 6;
            return { x: home.x + Math.cos(a) * dist, y: home.y + Math.sin(a) * dist };
        });

        const mocs = [
            { x: 95, y: 25, label: 'AI MOC' },
            { x: 40, y: 38, label: 'DevOps MOC' },
            { x: 55, y: 75, label: 'Engineering MOC' },
            { x: 90, y: 95, label: 'PeterPrint MOC' },
            { x: 155, y: 110, label: 'Career MOC' },
            { x: 210, y: 95, label: 'Coding MOC' },
        ];

        const bgNotes: { x: number; y: number; r: number }[] = [];
        for (let i = 0; i < 110; i++) {
            bgNotes.push({
                x: r() * W,
                y: r() * H,
                r: 0.7 + r() * 0.9,
            });
        }

        const bgEdges: [number, number, number, number][] = [];
        for (let i = 0; i < 70; i++) {
            const a = bgNotes[Math.floor(r() * bgNotes.length)];
            const b = bgNotes[Math.floor(r() * bgNotes.length)];
            bgEdges.push([a.x, a.y, b.x, b.y]);
        }

        return h('div', { class: 'rounded-xl border border-white/10 bg-black/80 p-2' }, [
            h('svg', { viewBox: `0 0 ${W} ${H}`, class: 'h-32 w-full', preserveAspectRatio: 'xMidYMid meet' }, [
                ...bgEdges.map(([x1, y1, x2, y2]) =>
                    h('line', { x1, y1, x2, y2, stroke: '#78350f', 'stroke-width': '0.2', opacity: '0.3' }),
                ),
                ...bgNotes.map((n) =>
                    h('circle', { cx: n.x, cy: n.y, r: n.r, fill: '#a16207', opacity: '0.35' }),
                ),
                ...fanNotes.map((n) =>
                    h('line', { x1: home.x, y1: home.y, x2: n.x, y2: n.y, stroke: '#eab308', 'stroke-width': '0.35', opacity: '0.85' }),
                ),
                ...mocs.map((m) =>
                    h('line', { x1: home.x, y1: home.y, x2: m.x, y2: m.y, stroke: '#eab308', 'stroke-width': '0.35', opacity: '0.9' }),
                ),
                ...fanNotes.map((n) => h('circle', { cx: n.x, cy: n.y, r: 1.4, fill: '#fde047' })),
                ...mocs.map((m) => [
                    h('circle', { cx: m.x, cy: m.y, r: 3, fill: '#d946ef' }),
                    h('text', {
                        x: m.x,
                        y: m.y + 7,
                        'text-anchor': 'middle',
                        fill: '#d946ef',
                        'font-size': '3.2',
                        'font-family': 'ui-monospace, monospace',
                        opacity: '0.9',
                    }, m.label),
                ]),
                h('circle', { cx: home.x, cy: home.y, r: 4, fill: '#facc15' }),
                h('text', {
                    x: home.x,
                    y: home.y + 10,
                    'text-anchor': 'middle',
                    fill: '#fef3c7',
                    'font-size': '4',
                    'font-family': 'ui-sans-serif, system-ui',
                }, 'Home'),
            ]),
            h('p', { class: 'mt-1 text-center font-mono text-[10px] text-slate-500' }, '573 notes · Home → MOCs (Maps of Content)'),
        ]);
    },
};

const DiagramMempalace: Component = {
    render() {
        return h('div', { class: 'rounded-xl border border-white/10 bg-ink-950/60 p-4 font-mono text-[11px] text-slate-300' }, [
            h('div', { class: 'space-y-1' }, [
                h('div', null, [h('span', { class: 'text-fuchsia-300' }, '🏛 palace/'), h('span', { class: 'text-slate-500' }, '')]),
                h('div', { class: 'pl-3' }, [h('span', { class: 'text-violet-300' }, '└─ wing: engineering')]),
                h('div', { class: 'pl-6' }, [h('span', { class: 'text-cyan-300' }, '└─ room: nats')]),
                h('div', { class: 'pl-9' }, [h('span', { class: 'text-accent' }, '└─ drawer: retry-backoff')]),
                h('div', { class: 'pl-12 text-slate-500' }, '↘ tunnel → room: kafka'),
            ]),
        ]);
    },
};

const DiagramPixelAgents: Component = PixelAgentsDiagram;

const DiagramClaudeApi: Component = {
    render() {
        return h('div', { class: 'rounded-xl border border-white/10 bg-ink-950/60 p-4 font-mono text-[11px]' }, [
            h('div', { class: 'text-slate-500' }, '// prompt caching + tool use'),
            h('div', { class: 'mt-2 text-slate-300' }, [
                h('span', { class: 'text-violet-300' }, 'await '),
                h('span', { class: 'text-accent-soft' }, 'anthropic'),
                h('span', { class: 'text-slate-400' }, '.messages.create({'),
            ]),
            h('div', { class: 'pl-3 text-slate-400' }, [
                h('span', null, 'model: '),
                h('span', { class: 'text-emerald-300' }, '"claude-opus-4-7"'),
                h('span', null, ','),
            ]),
            h('div', { class: 'pl-3 text-slate-400' }, [
                h('span', null, 'tools: ['),
                h('span', { class: 'text-accent-soft' }, 'fs'),
                h('span', null, ', '),
                h('span', { class: 'text-accent-soft' }, 'bash'),
                h('span', null, ', '),
                h('span', { class: 'text-accent-soft' }, 'grep'),
                h('span', null, '],'),
            ]),
            h('div', { class: 'text-slate-400' }, '});'),
        ]);
    },
};

const items: LabItem[] = [
    {
        title: 'Pixel Agents',
        description:
            'Stardew-style villages and top-down offices inhabited by LLM-driven NPCs. Each agent has a role, a portrait, a backstory, coordinates, and a job to do. They chop trees, farm code, and chat in speech bubbles while they work.',
        icon: 'ph:game-controller-fill',
        iconColor: 'text-emerald-300',
        glow: 'bg-emerald-500/15',
        span: 'lg:col-span-2 lg:row-span-1',
        tags: ['TypeScript', 'LLM agents', 'Pixel art'],
        diagram: DiagramPixelAgents,
    },
    {
        title: 'Claude Dashboard',
        description:
            'Central task API plus a runner that polls it and executes work on my machine. A small dashboard UI on top to watch tasks live, queue new ones, and review results.',
        icon: 'ph:squares-four-fill',
        iconColor: 'text-cyan-300',
        glow: 'bg-cyan-500/15',
        span: '',
        tags: ['Node', 'Queue', 'LLM ops'],
        diagram: DiagramClaudeDashboard,
    },
    {
        title: 'Local Brain',
        description:
            'Self-hosted vector search + RAG over my Obsidian vault. Fastify, Ollama, sql.js. An /ask endpoint that answers with citations to the exact notes it used.',
        icon: 'ph:brain-fill',
        iconColor: 'text-fuchsia-300',
        glow: 'bg-fuchsia-500/15',
        span: '',
        tags: ['Fastify', 'Ollama', 'RAG'],
        diagram: DiagramLocalBrain,
    },
    {
        title: 'Zettelkasten PKM',
        description:
            'A Luhmann-style Obsidian vault: atomic notes, dense wikilinks, MOCs. The source of truth Local Brain and Mempalace index and query.',
        icon: 'ph:graph-fill',
        iconColor: 'text-violet-300',
        glow: 'bg-violet-500/15',
        span: '',
        tags: ['Obsidian', 'Atomic notes'],
        diagram: DiagramZettelkasten,
    },
    {
        title: 'Mempalace',
        description:
            'Structured memory for LLM agents: wings, rooms, drawers, tunnels. A taxonomy-first knowledge graph agents can traverse instead of stuffing everything into a vector soup.',
        icon: 'ph:buildings-fill',
        iconColor: 'text-pink-300',
        glow: 'bg-pink-500/15',
        span: '',
        tags: ['MCP', 'Knowledge graph'],
        diagram: DiagramMempalace,
    },
    {
        title: 'Claude API tinkering',
        description:
            'Where I explore the primitives: prompt caching, tool use, extended thinking, batch, citations. Everything I build for agents starts here as a 40-line experiment.',
        icon: 'ph:flask-fill',
        iconColor: 'text-amber-300',
        glow: 'bg-amber-500/15',
        span: '',
        tags: ['Anthropic SDK', 'Experiments'],
        diagram: DiagramClaudeApi,
    },
];
</script>
