<template>
    <div id="projects" class="max-w-[1200px] mx-auto px-6 relative z-[2]" style="margin-top: 100px">
        <div class="reveal">
            <SectionIntro id="projects" kicker="open source, in production" title="In the wild." />
            <RepoCardsFrame>
                <p
                    class="text-text"
                    style="margin:0 0 22px;font-size:15px;line-height:1.7;max-width:680px"
                >
                    Packages I maintain or contributed heavily to. Small, focused, used in production in a handful of places.
                </p>
                <div class="grid gap-4" style="grid-template-columns: 1fr 1fr">
                    <a
                        v-for="p in PACKAGES"
                        :key="p.name"
                        :href="`https://github.com/Elandlord/${p.name}`"
                        target="_blank"
                        rel="noopener"
                        class="block no-underline text-text border border-line transition-all relative overflow-hidden repo-card"
                        style="padding: 22px; background: rgba(3,6,17,0.55)"
                    >
                        <div class="flex items-center gap-[10px]" style="margin-bottom: 10px">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="#22d3ee">
                                <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2 .37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                            <span class="font-mono-chrome text-head" style="font-size: 15px">{{ p.name }}</span>
                            <span
                                class="font-mono-chrome ml-auto"
                                style="font-size:11px;padding:2px 6px;color:#a78bfa;background:rgba(167,139,250,0.1);border:1px solid #a78bfa44"
                            >{{ p.lang }}</span>
                        </div>
                        <p
                            class="text-text"
                            style="margin: 0 0 14px; font-size: 14px; line-height: 1.55"
                        >{{ p.desc }}</p>
                        <div class="font-mono-chrome text-dim flex gap-[14px]" style="font-size: 11.5px">
                            <span>★ {{ p.stars }}</span>
                            <span>● updated {{ p.updated }}</span>
                        </div>
                    </a>
                </div>
            </RepoCardsFrame>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PACKAGES } from '~/data/site';
</script>

<style scoped>
.repo-card:hover {
    border-color: rgba(34, 211, 238, 0.4) !important;
    background: rgba(34, 211, 238, 0.05) !important;
}
</style>
