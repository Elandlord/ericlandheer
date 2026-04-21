<template>
    <div id="skills" class="max-w-[1200px] mx-auto px-6 relative z-[2]" style="margin-top: 100px">
        <div class="reveal">
            <SectionIntro id="skills" kicker="what I reach for" title="The toolkit." />
            <IdeFrame :tabs="tabs" :tree="tree" :active="active" @update:active="active = $event">
                <div
                    class="font-mono-chrome"
                    style="padding: 26px 30px; font-size: 13px; line-height: 1.8; background: rgba(3,6,17,0.3); min-height: 480px"
                >
                    <Transition name="tab-swap" mode="out-in">
                    <div :key="cur.name">
                    <div class="text-dim">
                        <span class="text-dim">1</span>
                        <span style="color: #7c7c7c">// {{ fileFor(cur) }}</span>
                    </div>
                    <div>
                        <span class="text-dim">2</span>
                        <span class="text-pink">import</span>
                        <span class="text-cyan">{ Engineer }</span>
                        <span class="text-pink">from</span>
                        <span class="text-lime">'../core'</span>;
                    </div>
                    <div><span class="text-dim">3</span></div>
                    <div>
                        <span class="text-dim">4</span>
                        <span class="text-pink">export const</span>
                        <span class="text-amber">{{ cur.name.toLowerCase().replace(/[^a-z0-9]/g, '') }}</span>
                        <span class="text-head">=</span>
                        <span class="text-cyan">{</span>
                    </div>
                    <div>
                        <span class="text-dim">5</span>
                        <span class="text-violet">name</span>:
                        <span class="text-lime">"{{ cur.name }}"</span>,
                    </div>
                    <div>
                        <span class="text-dim">6</span>
                        <span class="text-violet">domain</span>:
                        <span class="text-lime">"{{ cur.tag }}"</span>,
                    </div>
                    <div>
                        <span class="text-dim">7</span>
                        <span class="text-violet">confidence</span>:
                        <span class="text-amber">"{{ confidence }}"</span>,
                    </div>
                    <div>
                        <span class="text-dim">8</span>
                        <span class="text-violet">blurb</span>:
                        <span class="text-lime">`</span>
                    </div>
                    <div
                        class="font-sans text-text"
                        :style="{
                            paddingLeft: '40px',
                            fontSize: '15px',
                            lineHeight: '1.65',
                            margin: '8px 0 8px 12px',
                            borderLeft: `2px solid ${curColor}55`,
                            paddingRight: '16px',
                        }"
                    >
                        {{ cur.blurb }}
                    </div>
                    <div>
                        <span class="text-dim">{{ SKILLS.length + 8 }}</span>
                        <span class="text-lime">`</span>,
                    </div>
                    <div>
                        <span class="text-dim">{{ SKILLS.length + 9 }}</span>
                        <span class="text-violet">pairs_with</span>: [
                        <template v-for="(s, i) in pairs" :key="s.name">
                            <button
                                type="button"
                                class="font-mono-chrome cursor-pointer border-0 bg-transparent p-0"
                                :style="{ fontSize: '13px', color: curColor, textDecoration: 'underline dotted' }"
                                @click="active = s.name"
                            >
                                "{{ s.name }}"
                            </button>
                            <span v-if="i < pairs.length - 1">, </span>
                        </template>
                        ],
                    </div>
                    <div>
                        <span class="text-dim">{{ SKILLS.length + 10 }}</span>
                        <span class="text-cyan">}</span>;
                    </div>
                    </div>
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

const active = ref(SKILLS[0].name);

const ext = (t: Skill['tag']) => (t === 'backend' ? '.php' : t === 'frontend' ? '.vue' : '.yml');
const fileFor = (s: Skill) => s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + ext(s.tag);

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

const cur = computed(() => SKILLS.find((s) => s.name === active.value) || SKILLS[0]);
const curColor = computed(() => SKILL_COLORS[cur.value.tag].dot);
const confidence = computed(() => {
    const arr = ['high', 'high', 'solid', 'reaching', 'solid', 'high', 'high', 'reaching', 'high'];
    return arr[SKILLS.indexOf(cur.value) % 9] === 'high' ? 'high' : 'solid';
});
const pairs = computed(() => SKILLS.filter((s) => s.tag === cur.value.tag && s.name !== cur.value.name).slice(0, 3));
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
</style>
