<template>
    <footer
        class="max-w-[1200px] mx-auto relative z-[2] border-t border-line"
        style="margin: 110px auto 40px; padding: 28px 24px 0"
    >
        <div
            class="font-mono-chrome text-dim flex justify-between gap-5 flex-wrap"
            style="font-size: 12px"
        >
            <div>
                <span class="text-cyan">eric.landheer</span>
                <span> © {{ year }} · Groningen, NL</span>
            </div>
            <div class="flex gap-4">
                <span>no trackers</span>
                <span>·</span>
                <span>no cookies</span>
                <span>·</span>
                <span>built with <span class="text-pink">&lt;3</span> + <span class="text-cyan">nuxt</span></span>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>
