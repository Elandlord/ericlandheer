<template>
    <div id="about" class="max-w-[1200px] mx-auto px-4 md:px-6 relative z-[2]" style="margin-top: 90px">
        <div class="reveal">
            <SectionIntro id="about" kicker="who am I" title="A decade of shipping." />
            <ReadmeFrame>
                <div class="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-8 md:gap-10">
                    <div class="text-text" style="font-size: 17px; line-height: 1.75">
                        <p class="m-0">
                            Ten-plus years in. Full stack engineer from Groningen. I build practical, scalable software. Mostly Laravel, Symfony, Vue and Nuxt. Go, NATS and Docker when a problem calls for them.
                        </p>
                        <p style="margin-top: 18px">
                            Right now I'm at <span class="text-amber">Simplicate</span>. Building their business software platform for professional services — Symfony, complex domain logic, a large PHP codebase with real depth. Joined June 2026.
                        </p>
                        <p style="margin-top: 18px">
                            Before that I was at <span class="text-head">PeterPrint</span> for four years. Magento 2, a fleet of Symfony microservices, Nuxt front-ends, a lot of NATS in between. Back-end code reviews and Scrum on top of that.
                        </p>
                        <p class="text-dim" style="margin-top: 18px">
                            Side time goes to the <a href="#lab" class="text-pink no-underline">lab</a>. LLM agents, pixel villages, a self-hosted brain over my Obsidian vault. Not products. Just giving the models something interesting to do.
                        </p>
                    </div>
                    <aside
                        class="font-mono-chrome text-text border border-line self-start"
                        style="font-size: 13px; line-height: 1.9; background: rgba(3,6,17,0.6); padding: 18px 20px"
                    >
                        <div class="text-cyan" style="margin-bottom: 8px">~/stats.json</div>
                        <div><span class="text-violet">"years_shipping"</span>: <span class="text-amber">10+</span>,</div>
                        <div><span class="text-violet">"home"</span>: <span class="text-lime">"Groningen, NL"</span>,</div>
                        <div><span class="text-violet">"stack"</span>: [<span class="text-lime">"php","ts","go"</span>],</div>
                        <div><span class="text-violet">"current"</span>: <span class="text-lime">"simplicate"</span>,</div>
                        <div><span class="text-violet">"since"</span>: <span class="text-pink">"2026-06"</span>,</div>
                        <div><span class="text-violet">"open_to_roles"</span>: <span style="color: #f87171">false</span>,</div>
                        <div><span class="text-violet">"open_to_talking"</span>: <span class="text-lime">true</span></div>
                    </aside>
                </div>
            </ReadmeFrame>
        </div>
    </div>
</template>

<script setup lang="ts"></script>
