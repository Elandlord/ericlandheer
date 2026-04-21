<template>
    <section
        class="border border-line overflow-hidden"
        style="background: #0a0f1f; box-shadow: 0 20px 60px -20px rgba(0,0,0,0.6)"
    >
        <div
            class="flex border-b border-line font-mono-chrome text-[11px]"
            style="background: rgba(3,6,17,0.7)"
        >
            <span
                class="px-[14px] py-[6px] border-r border-line"
                style="background: #0a0f1f; color: #e6edf3"
            >contact.md</span>
            <span class="px-[14px] py-[6px]" style="color: #475569">[No Name]</span>
            <span class="ml-auto px-[14px] py-[6px]" style="color: #7d8590">~/.vimrc</span>
        </div>
        <div style="display:grid;grid-template-columns:42px 1fr;min-height:360px">
            <div
                class="font-mono-chrome text-[12px]"
                style="color:#475569;padding:18px 8px 18px 0;text-align:right;line-height:1.7;background:rgba(3,6,17,0.4)"
            >
                <div v-for="i in 18" :key="i">{{ i }}</div>
            </div>
            <div class="relative" style="padding: 18px 22px">
                <slot />
            </div>
        </div>
        <div
            class="flex items-center font-mono-chrome text-[11px]"
            style="background:#22d3ee;color:#050814;font-weight:700"
        >
            <span class="px-[10px] py-1" style="background:#a78bfa">NORMAL</span>
            <span class="px-[10px] py-1">contact.md</span>
            <span class="ml-auto px-[10px] py-1">utf-8 · markdown</span>
            <span class="px-[10px] py-1" style="background:#f472b6">100%</span>
            <span class="px-[10px] py-1">18:1</span>
        </div>
        <div
            class="font-mono-chrome text-[12px] border-t border-line"
            style="background: #050814; color: #cbd5e1; padding: 6px 14px"
        >
            <span class="text-pink">:</span>
            <span>echo "let's talk. pick a channel above."</span>
            <span class="text-pink" style="animation: blink 1s infinite">▋</span>
        </div>
    </section>
</template>

<script setup lang="ts"></script>
