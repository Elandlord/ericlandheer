<template>
    <section
        class="border border-line"
        style="background: rgba(10,15,31,0.78); box-shadow: 0 20px 60px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.03)"
    >
        <div
            class="flex items-center gap-[10px] px-[14px] py-[10px] border-b border-line font-mono-chrome text-[12px] flex-wrap"
            style="background: rgba(17,24,39,0.6)"
        >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="#7d8590">
                <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688l-.011-.013-2.914-2.914-.013-.011Z" />
            </svg>
            <span style="color: #e6edf3; font-weight: 500">README.md</span>
            <span class="hidden sm:inline" style="color: #7d8590">·</span>
            <span class="hidden sm:inline" style="color: #7d8590">eric.landheer / main</span>
            <div class="ml-auto flex gap-1">
                <button
                    v-for="t in tabs"
                    :key="t.id"
                    type="button"
                    class="font-mono-chrome text-[11px] px-[10px] py-[4px] cursor-pointer rounded-[4px] border"
                    :class="tab === t.id ? 'border-[rgba(148,163,184,0.26)]' : 'border-transparent'"
                    :style="{
                        background: tab === t.id ? 'rgba(110,118,129,0.2)' : 'transparent',
                        color: tab === t.id ? '#e6edf3' : '#7d8590',
                    }"
                    @click="tab = t.id"
                >
                    {{ t.label }}
                </button>
            </div>
        </div>
        <div class="px-4 md:px-8 py-5 md:py-7 readme-body">
            <Transition name="readme-swap" mode="out-in">
                <div v-if="tab === 'preview'" key="preview">
                    <slot />
                </div>
                <pre
                    v-else-if="tab === 'raw'"
                    key="raw"
                    class="m-0 font-mono-chrome text-[13px]"
                    style="line-height: 1.7; color: #cbd5e1"
                ><div v-for="(l, i) in rawLines" :key="i" style="display:flex"><span style="width:34px;color:#475569;text-align:right;padding-right:14px;user-select:none">{{ i + 1 }}</span><span>{{ l }}</span></div></pre>
                <div v-else key="blame" class="font-mono-chrome" style="font-size: 12.5px; color: #cbd5e1">
                    <div
                        v-for="(r, i) in blameRows"
                        :key="i"
                        class="py-[6px] grid gap-3 md:gap-[14px] grid-cols-[80px_1fr_30px] md:grid-cols-[90px_200px_120px_40px_1fr]"
                        style="border-bottom:1px dashed rgba(148,163,184,0.1)"
                    >
                        <span style="color: #22d3ee">{{ r.hash }}</span>
                        <span style="color: #7d8590" class="truncate">{{ r.msg }}</span>
                        <span class="hidden md:inline" style="color: #7d8590">{{ r.age }}</span>
                        <span style="color: #475569; text-align: right">{{ r.line }}</span>
                        <span class="hidden md:inline" style="color: #7d8590">···</span>
                    </div>
                </div>
            </Transition>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tabs = [
    { id: 'preview', label: 'Preview' },
    { id: 'raw', label: 'Raw' },
    { id: 'blame', label: 'Blame' },
] as const;

type TabId = (typeof tabs)[number]['id'];
const tab = ref<TabId>('preview');

const rawLines = [
    '# Eric Landheer',
    '',
    '> Full stack engineer. Based in Groningen, NL.',
    '> Starting at [Simplicate](https://simplicate.com) in June 2026.',
    '',
    '## what I do',
    '',
    '- Laravel, Symfony, Vue, Nuxt for production web apps',
    '- Go, NATS, Docker, k8s when they earn their place',
    '- Back-end code reviews + Scrum facilitation',
    '',
    '## elsewhere',
    '',
    '- github.com/Elandlord',
    '- linkedin.com/in/ericlandheer',
];

const blameRows = [
    { hash: 'a1b4e2c', msg: 'initial about', age: '4y ago', line: 1 },
    { hash: 'a1b4e2c', msg: 'initial about', age: '4y ago', line: 2 },
    { hash: 'f93c0aa', msg: 'update role at peterprint', age: '2y ago', line: 3 },
    { hash: 'f93c0aa', msg: 'update role at peterprint', age: '2y ago', line: 4 },
    { hash: '6e21110', msg: 'announce simplicate', age: '2 weeks ago', line: 5 },
];
</script>

<style scoped>
.readme-body {
    position: relative;
}
.readme-swap-enter-active,
.readme-swap-leave-active {
    transition: opacity 0.22s ease, transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}
.readme-swap-enter-from {
    opacity: 0;
    transform: translateY(6px);
}
.readme-swap-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}
</style>
