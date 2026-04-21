<template>
    <div class="max-w-[1200px] mx-auto mt-10 px-6 relative z-[2]">
        <div
            class="reveal border border-line"
            style="background: rgba(3,6,17,0.85); box-shadow: 0 20px 60px -25px rgba(0,0,0,0.8)"
        >
            <div class="px-[14px] py-[10px] border-b border-line flex items-center gap-[14px] font-mono-chrome text-[12px]">
                <TrafficLights />
                <span class="text-dim">
                    zsh · <span class="text-cyan">~/eric.landheer</span> · any section name jumps the page
                </span>
                <span class="ml-auto text-dim">try: <span class="text-pink">lab</span></span>
            </div>
            <div
                ref="scrollEl"
                class="px-[18px] py-[14px] font-mono-chrome text-[13px] overflow-y-auto"
                style="max-height: 170px; line-height: 1.6"
                @click="inputEl?.focus()"
            >
                <div v-for="(l, i) in lines" :key="i" :class="lineColor(l.k)">
                    <template v-if="l.k === 'cmd'">
                        <span class="text-pink">➜</span>
                        <span class="text-cyan">~/eric.landheer</span>
                        <span class="text-amber">$</span>
                        {{ l.t }}
                    </template>
                    <template v-else>{{ l.t }}</template>
                </div>
                <form class="flex items-center gap-2 mt-1" @submit.prevent="submit">
                    <span class="text-pink">➜</span>
                    <span class="text-cyan">~/eric.landheer</span>
                    <span class="text-amber">$</span>
                    <input
                        ref="inputEl"
                        v-model="input"
                        autocomplete="off"
                        spellcheck="false"
                        placeholder="type 'help' …"
                        class="bg-transparent border-0 outline-none text-text flex-1 font-mono-chrome text-[13px]"
                    />
                </form>
            </div>
            <div class="flex flex-wrap gap-2 px-[14px] py-[10px] border-t border-line" style="background: rgba(10,15,31,0.5)">
                <button
                    v-for="c in chips"
                    :key="c"
                    type="button"
                    class="font-mono-chrome text-[12px] px-[10px] py-[5px] border border-line text-text cursor-pointer"
                    style="background: rgba(34,211,238,0.06)"
                    @click="run(c)"
                >
                    <span class="text-dim">$ </span>{{ c }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue';
import { SECTIONS } from '~/data/site';

type Kind = 'sys' | 'cmd' | 'out' | 'err';
interface Line {
    k: Kind;
    t: string;
}

const lines = ref<Line[]>([
    { k: 'sys', t: 'eric@landheer / zsh / 80×24' },
    { k: 'out', t: 'Welcome. Try typing a section name, or click a chip below.' },
]);
const input = ref('');
const inputEl = ref<HTMLInputElement | null>(null);
const scrollEl = ref<HTMLDivElement | null>(null);
const chips = ['about', 'skills', 'experience', 'lab', 'projects', 'contact', 'help'];

function lineColor(k: Kind) {
    if (k === 'err') return 'text-[#f87171]';
    if (k === 'sys') return 'text-dim';
    return 'text-text';
}

async function scrollBottom() {
    await nextTick();
    if (scrollEl.value) scrollEl.value.scrollTop = scrollEl.value.scrollHeight;
}

function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    const echo: Line = { k: 'cmd', t: raw };
    if (!cmd) {
        lines.value.push(echo);
        scrollBottom();
        return;
    }
    if (cmd === 'clear') {
        lines.value = [{ k: 'sys', t: 'cleared.' }];
        scrollBottom();
        return;
    }
    if (cmd === 'help' || cmd === 'ls') {
        lines.value.push(echo, { k: 'out', t: 'sections: about · skills · experience · lab · projects · contact' });
        scrollBottom();
        return;
    }
    if (cmd === 'whoami') {
        lines.value.push(echo, { k: 'out', t: 'eric.landheer / full stack engineer / Groningen, NL' });
        scrollBottom();
        return;
    }
    const target = SECTIONS.find((s) => s.id === cmd || cmd.startsWith(s.id));
    if (target) {
        lines.value.push(echo, { k: 'out', t: `jumping to #${target.id}…` });
        setTimeout(() => {
            document.getElementById(target.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
        scrollBottom();
        return;
    }
    lines.value.push(echo, { k: 'err', t: `command not found: ${cmd}. try 'help'.` });
    scrollBottom();
}

function submit() {
    run(input.value);
    input.value = '';
}

onMounted(scrollBottom);
</script>
