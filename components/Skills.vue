<template>
    <div id="skills" class="max-w-[1200px] mx-auto px-4 md:px-6 relative z-[2]" style="margin-top: 100px">
        <div class="reveal">
            <SectionIntro id="skills" kicker="what I reach for" title="The toolkit." />
            <IdeFrame :tabs="tabs" :tree="tree" :active="active" @update:active="active = $event">
                <div
                    class="font-mono-chrome px-4 md:px-[30px] py-5 md:py-[26px]"
                    style="font-size: 13px; line-height: 1.8; background: rgba(3,6,17,0.3); min-height: 480px"
                >
                    <Transition name="tab-swap" mode="out-in">
                        <div
                            v-if="highlighted?.[cur.name]"
                            :key="cur.name"
                            class="shiki-host overflow-x-auto"
                            v-html="highlighted[cur.name]"
                        />
                        <pre
                            v-else
                            :key="`raw-${cur.name}`"
                            class="font-mono-chrome text-text m-0 p-0"
                            style="white-space: pre; overflow-x: auto; font-size: 13px; line-height: 1.8; background: none; border: none;"
                            v-text="cur.code"
                        />
                    </Transition>
                    <div
                        class="flex flex-wrap gap-[6px]"
                        style="margin-top: 18px; padding-top: 14px; border-top: 1px dashed rgba(148,163,184,0.14)"
                    >
                        <span
                            class="text-dim mr-2"
                            style="font-size: 11px; letter-spacing: 1px; text-transform: uppercase"
                        >all files:</span>
                        <button
                            v-for="s in SKILLS"
                            :key="s.name"
                            type="button"
                            class="font-mono-chrome cursor-pointer"
                            :style="{
                                fontSize: '11px',
                                padding: '3px 8px',
                                background: active === s.name ? 'rgba(34,211,238,0.15)' : 'transparent',
                                color: active === s.name ? '#f1f5f9' : '#64748b',
                                border: `1px solid ${active === s.name ? SKILL_COLORS[s.tag].dot + '66' : 'rgba(148,163,184,0.14)'}`,
                            }"
                            @click="active = s.name"
                        >{{ s.name }}</button>
                    </div>
                </div>
            </IdeFrame>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { SKILLS, type Skill } from '~/data/site';

const SKILL_COLORS: Record<Skill['tag'], { dot: string }> = {
    backend: { dot: '#22d3ee' },
    frontend: { dot: '#a78bfa' },
    infra: { dot: '#f472b6' },
};

const active = ref(SKILLS[0]?.name ?? '');

const fileFor = (s: Skill): string => {
    if (s.lang === 'docker') return 'Dockerfile';
    const exts: Record<string, string> = { php: '.php', vue: '.vue', html: '.html', go: '.go', yaml: '.yml' };
    return s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + (exts[s.lang] ?? '.txt');
};

const byTag = computed(() => {
    const b: Record<Skill['tag'], Skill[]> = { backend: [], frontend: [], infra: [] };
    SKILLS.forEach((s) => b[s.tag].push(s));
    return b;
});

const tree = computed(() => [
    { label: 'src/backend/', children: byTag.value.backend.map((s) => ({ id: s.name, filename: fileFor(s), dot: SKILL_COLORS.backend.dot })) },
    { label: 'src/frontend/', children: byTag.value.frontend.map((s) => ({ id: s.name, filename: fileFor(s), dot: SKILL_COLORS.frontend.dot })) },
    { label: 'src/infra/', children: byTag.value.infra.map((s) => ({ id: s.name, filename: fileFor(s), dot: SKILL_COLORS.infra.dot })) },
]);

const tabs = computed(() =>
    SKILLS.map((s) => ({ id: s.name, filename: fileFor(s), dot: SKILL_COLORS[s.tag].dot })),
);

const cur = computed(() => SKILLS.find((s) => s.name === active.value) ?? SKILLS[0]!);

const shikiLang = (lang: string): string => {
    if (lang === 'docker') return 'dockerfile';
    if (lang === 'yaml') return 'yaml';
    return lang;
};

const { data: highlighted } = await useAsyncData('skills-highlighted', async () => {
    const { createHighlighter } = await import('shiki');
    const hl = await createHighlighter({
        themes: ['night-owl'],
        langs: ['php', 'vue', 'html', 'dockerfile', 'go', 'yaml'],
    });
    const out: Record<string, string> = {};
    for (const s of SKILLS) {
        out[s.name] = hl.codeToHtml(s.code, {
            lang: shikiLang(s.lang),
            theme: 'night-owl',
        });
    }
    hl.dispose();
    return out;
});
</script>

<style scoped>
.tab-swap-enter-active,
.tab-swap-leave-active {
    transition: opacity 0.22s ease, transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}
.tab-swap-enter-from {
    opacity: 0;
    transform: translateY(6px);
}
.tab-swap-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}
.shiki-host :deep(pre.shiki) {
    margin: 0;
    padding: 0;
    background: transparent !important;
    font-size: 13px;
    line-height: 1.8;
    font-family: inherit;
    overflow-x: auto;
}
.shiki-host :deep(pre.shiki code) {
    font-family: inherit;
    background: transparent;
    display: block;
}
.shiki-host :deep(pre.shiki .line) {
    min-height: 1em;
}
</style>
