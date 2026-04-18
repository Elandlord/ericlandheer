<template>
    <footer class="relative z-10 mt-24 border-t border-white/5">
        <div class="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-4 py-10 sm:flex-row sm:items-center sm:px-6 lg:px-8">
            <div class="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">
                © {{ year }} · Eric Landheer · Groningen
            </div>
            <div class="flex items-center gap-3">
                <a
                    href="https://github.com/Elandlord"
                    target="_blank"
                    rel="noreferrer"
                    class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
                    aria-label="GitHub"
                >
                    <Icon name="mdi:github" class="h-4 w-4" />
                </a>
                <a
                    href="/geef-mij-een-glitterplaatje"
                    target="_blank"
                    rel="noreferrer"
                    class="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 px-3 py-1.5 text-xs font-medium text-pink-100 ring-1 ring-pink-400/30 transition hover:from-pink-500/30 hover:to-fuchsia-500/30"
                >
                    <Icon name="ph:sparkle-fill" class="h-3.5 w-3.5" />
                    Glitterplaatje
                </a>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear();
</script>
