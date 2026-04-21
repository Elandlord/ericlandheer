<template>
    <section
        class="border border-line"
        style="background: rgba(3,6,17,0.85); box-shadow: 0 20px 60px -20px rgba(0,0,0,0.6)"
    >
        <div
            class="px-4 py-[10px] border-b border-line flex items-center gap-3 font-mono-chrome text-[12px]"
            style="color: #7d8590"
        >
            <span class="text-cyan">$</span>
            <span style="color: #e6edf3">git log</span>
            <span class="text-violet">--graph --oneline --all --decorate</span>
            <span class="ml-auto" style="color: #475569">HEAD → simplicate</span>
        </div>
        <div class="px-[18px] pt-[22px] pb-[26px]"><slot /></div>
        <div
            class="px-4 py-2 border-t border-line font-mono-chrome"
            style="background: rgba(17,24,39,0.4); font-size: 10.5px; color: #7d8590"
        >
            (END) · <span class="text-cyan">q</span> to quit, <span class="text-cyan">j/k</span> to scroll
        </div>
    </section>
</template>

<script setup lang="ts"></script>
