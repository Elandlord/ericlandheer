export type JobType = 'work' | 'school' | 'certification';

export interface Job {
    title: string;
    company: string;
    city: string;
    image: string;
    from: string;
    until: string | null;
    description: string;
    type: JobType;
    upcoming?: boolean;
    url?: string;
}

export interface Skill {
    name: string;
    blurb: string;
    tag: 'backend' | 'frontend' | 'infra';
    lang: string;
    code: string;
}

export interface LabProject {
    title: string;
    desc: string;
    tags: string[];
    glyph: string;
}

export interface Package {
    name: string;
    desc: string;
    lang: string;
    stars: number;
    updated: string;
}

export const JOBS: Job[] = [
    {
        title: 'Senior Engineer',
        company: 'Simplicate',
        city: 'Groningen',
        image: '/assets/images/simplicate.svg',
        from: '2026-06',
        until: null,
        description:
            'Joining the Simplicate engineering team to help build their business software platform for professional services.',
        type: 'work',
        upcoming: true,
    },
    {
        title: 'Developer · Scrum Master',
        company: 'PeterPrint',
        city: 'Groningen',
        image: '/assets/images/peterprint.svg',
        from: '2022-01',
        until: '2026-05',
        description:
            'Magento 2 webshop + a fleet of Symfony microservices, Nuxt storefronts, event-driven integrations. NATS messaging, scalable architecture, developer workflows. Served as Scrum Master and main back-end code reviewer.',
        type: 'work',
    },
    {
        title: 'Founder · Full stack developer',
        company: 'MEN Technology & Media',
        city: 'Groningen',
        image: '/assets/images/men.png',
        from: '2014-01',
        until: '2021-12',
        description:
            'My own company. Designed, built and shipped Laravel + Vue web applications for a wide range of clients. Ran everything end to end: discovery, architecture, delivery, hosting, client relationships.',
        type: 'work',
    },
    {
        title: 'Back-end developer',
        company: 'Qlic Internet Solutions',
        city: 'Groningen',
        image: '/assets/images/qlic.png',
        from: '2021-11',
        until: '2021-11',
        description:
            'Short stint writing PHP back-end code. Good people. Not the right fit for me at the time.',
        type: 'work',
    },
    {
        title: 'Junior developer',
        company: 'RAPIDE Internet',
        city: 'Groningen',
        image: '/assets/images/rapide.svg',
        from: '2017-10',
        until: '2018-09',
        description:
            'First professional steps in web development. PHP, JavaScript, a lot of learning on the job.',
        type: 'work',
    },
    {
        title: 'Kitchen worker',
        company: 'Bilderberg Landgoed Lauswolt',
        city: 'Beetsterzwaag',
        image: '/assets/images/bilderberg.jpeg',
        from: '2010-10',
        until: '2012-10',
        description:
            'Before code there was mise en place. Taught me pace, precision, and grace under pressure.',
        type: 'work',
    },
];

export const EDUCATION: Job[] = [
    {
        title: 'HBO-ICT (Bachelor)',
        company: 'Hanzehogeschool Groningen',
        city: 'Groningen',
        image: '/assets/images/hanze.png',
        from: '2012-09',
        until: '2020-02',
        description: 'Bachelor in ICT, focus on software engineering.',
        type: 'school',
    },
    {
        title: 'Senior Laravel Developer Exam',
        company: 'Laravel LLC',
        city: 'Arkansas City',
        image: '/assets/images/laravel.png',
        from: '2021-11',
        until: '2021-11',
        description: 'Official Senior Laravel Developer certification.',
        type: 'certification',
        url: 'https://verifier.certificationforlaravel.org/66cb0c49-e756-4aaa-a92a-01a7c66bd4c4',
    },
    {
        title: 'Agile Scrum Master Training',
        company: 'Agile Scrum Group',
        city: 'Remote',
        image: '/assets/images/agile-scrum-group.png',
        from: '2025-05',
        until: '2025-05',
        description: 'Sprint facilitation, backlog refinement, team coaching.',
        type: 'certification',
        url: 'https://agilescrumgroup.nl/scrum-master/',
    },
];

export const TIMELINE: Job[] = [...JOBS, ...EDUCATION].sort((a, b) => {
    const ak = a.upcoming ? Infinity : new Date((a.until || '2099-01') + '-01').getTime();
    const bk = b.upcoming ? Infinity : new Date((b.until || '2099-01') + '-01').getTime();
    return bk - ak;
});

export const SKILLS: Skill[] = [
    {
        name: 'Laravel & Symfony',
        blurb: 'Production APIs, robust domain logic, maintainable service architecture.',
        tag: 'backend',
        lang: 'php',
        code: `<?php declare(strict_types=1);

namespace App\\Http\\Controllers;

use App\\Models\\Order;
use App\\Services\\InvoiceService;
use Illuminate\\Http\\JsonResponse;

final class OrderController extends Controller
{
    public function __construct(
        private readonly InvoiceService $invoices,
    ) {}

    public function show(Order $order): JsonResponse
    {
        $invoice = $this->invoices->generate($order);

        return response()->json([
            'order'   => $order,
            'invoice' => $invoice,
        ]);
    }
}`,
    },
    {
        name: 'Vue & Nuxt',
        blurb: 'Interactive interfaces with clear state management and component-driven structure.',
        tag: 'frontend',
        lang: 'vue',
        code: `<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
    title: string;
    items: string[];
}

const { title, items } = defineProps<Props>();
const search = ref('');

const filtered = computed(() =>
    items.filter(i => i.includes(search.value)),
);
</script>

<template>
    <section>
        <h2>{{ title }}</h2>
        <input v-model="search" placeholder="Filter..." />
        <ul>
            <li v-for="item in filtered" :key="item">
                {{ item }}
            </li>
        </ul>
    </section>
</template>`,
    },
    {
        name: 'Tailwind CSS',
        blurb: 'Fast UI iteration with consistent spacing, hierarchy, responsive behaviour.',
        tag: 'frontend',
        lang: 'html',
        code: `<div class="flex min-h-screen items-center justify-center bg-gray-950">
    <article class="max-w-md rounded-2xl border border-white/10
                    bg-white/5 p-8 shadow-xl backdrop-blur">
        <span class="text-xs font-semibold uppercase tracking-widest
                     text-pink-400">
            Featured
        </span>
        <h2 class="mt-2 text-2xl font-bold text-white">
            Card title
        </h2>
        <p class="mt-3 text-sm leading-relaxed text-gray-400">
            Clean hierarchy, consistent spacing, responsive by default.
        </p>
        <button class="mt-6 rounded-lg bg-cyan-500 px-4 py-2
                       text-sm font-medium text-gray-950
                       transition hover:bg-cyan-400">
            Get started
        </button>
    </article>
</div>`,
    },
    {
        name: 'Docker & Kubernetes',
        blurb: 'Predictable local and CI environments across services and platforms.',
        tag: 'infra',
        lang: 'docker',
        code: `FROM node:22-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package*.json ./
RUN npm ci --omit=dev

FROM base AS builder
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
COPY --from=deps    /app/node_modules ./node_modules
COPY --from=builder /app/.output      ./.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]`,
    },
    {
        name: 'Go',
        blurb: 'Lightweight services and tooling where simplicity and performance matter.',
        tag: 'backend',
        lang: 'go',
        code: `package main

import (
    "encoding/json"
    "log"
    "net/http"
)

type HealthResponse struct {
    Status string \`json:"status"\`
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(HealthResponse{Status: "ok"})
}

func main() {
    http.HandleFunc("/health", healthHandler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}`,
    },
    {
        name: 'Event-driven systems',
        blurb: 'NATS, Kafka, RabbitMQ. Reliable async workflows between services.',
        tag: 'infra',
        lang: 'yaml',
        code: `# NATS JetStream consumer
consumers:
  - name: order-processor
    stream: ORDERS
    durable: order-processor
    deliver_policy: all
    ack_policy: explicit
    max_deliver: 5
    ack_wait: 30s
    filter_subject: orders.created

streams:
  - name: ORDERS
    subjects:
      - orders.>
    retention: limits
    max_age: 72h
    storage: file
    num_replicas: 3`,
    },
];

export const LAB: LabProject[] = [
    {
        title: 'Pixel Agents',
        desc: 'Stardew-style villages and top-down offices inhabited by LLM-driven NPCs. Each agent has a role, a portrait, a backstory, coordinates, a job. They chop trees, farm code, chat in speech bubbles while they work.',
        tags: ['TypeScript', 'LLM agents', 'Pixel art'],
        glyph: '🎮',
    },
    {
        title: 'Claude Dashboard',
        desc: 'A central task API plus a runner that polls it and executes work on my machine. Small dashboard on top to watch tasks live, queue new ones, review results.',
        tags: ['Node', 'Queue', 'LLM ops'],
        glyph: '▦',
    },
    {
        title: 'Local Brain',
        desc: 'Self-hosted vector search and RAG over my Obsidian vault. Fastify, Ollama, sql.js. An /ask endpoint that answers with citations to the exact notes it used.',
        tags: ['Fastify', 'Ollama', 'RAG'],
        glyph: '◉',
    },
    {
        title: 'Zettelkasten PKM',
        desc: 'A Luhmann-style Obsidian vault. Atomic notes, dense wikilinks, MOCs. The source of truth Local Brain and Mempalace index and query.',
        tags: ['Obsidian', 'Atomic notes'],
        glyph: '⌘',
    },
    {
        title: 'Mempalace',
        desc: 'Structured memory for LLM agents. Wings, rooms, drawers, tunnels. A taxonomy-first knowledge graph agents can traverse instead of stuffing everything into a vector soup.',
        tags: ['MCP', 'Knowledge graph'],
        glyph: '⌂',
    },
    {
        title: 'Claude Code plugins',
        desc: 'Custom skills, slash commands, CLAUDE.md conventions. /review /bug /zettel /sprint-review /security-review and a skill-codex wrapper for Codex CLI.',
        tags: ['Claude Code', 'Skills'],
        glyph: '›_',
    },
    {
        title: 'PKM Gardener',
        desc: 'Autonomous agent that drains 0 Inbox/, promotes fleeting notes to proper Zettels, enriches seedlings with tags and wikilinks, kicks Local Brain to reindex.',
        tags: ['Agents', 'Obsidian'],
        glyph: '✿',
    },
    {
        title: 'Claude API tinkering',
        desc: 'Where I explore the primitives. Prompt caching, tool use, extended thinking, batch, citations. Every agent I build starts here as a 40-line experiment.',
        tags: ['Anthropic SDK'],
        glyph: '⚗',
    },
];

export const PACKAGES: Package[] = [
    { name: 'nats-php-bundle', desc: 'Symfony bundle for wiring NATS JetStream consumers and publishers into Symfony projects.', lang: 'PHP', stars: 14, updated: '2w ago' },
    { name: 'nats-php', desc: 'Lightweight PHP client for NATS core + JetStream. Zero dependencies, tested against real NATS.', lang: 'PHP', stars: 9, updated: '1mo ago' },
];

export const SECTIONS = [
    { id: 'about', label: 'about' },
    { id: 'skills', label: 'skills' },
    { id: 'experience', label: 'experience' },
    { id: 'lab', label: 'lab' },
    { id: 'projects', label: 'projects' },
    { id: 'contact', label: 'contact' },
];

export function fmtPeriod(from: string, until: string | null): string {
    const opt: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' };
    const start = new Date(from + '-01').toLocaleDateString('en-GB', opt);
    const end = until ? new Date(until + '-01').toLocaleDateString('en-GB', opt) : 'now';
    return `${start} → ${end}`;
}
