<template>
    <div id="about" class="max-w-[1200px] mx-auto px-6 relative z-[2]" style="margin-top: 90px">
        <div class="reveal">
            <SectionIntro id="about" kicker="who am I" title="A decade of shipping." />
            <ReadmeFrame>
                <div class="grid" style="grid-template-columns: 1.5fr 1fr; gap: 40px">
                    <div class="text-text" style="font-size: 17px; line-height: 1.75">
                        <p class="m-0">
                            Ten-plus years in. Full stack engineer from Groningen. I build practical, scalable software. Mostly Laravel, Symfony, Vue and Nuxt. Go, NATS and Docker when a problem calls for them.
                        </p>
                        <p style="margin-top: 18px">
                            Right now I'm at <span class="text-amber">PeterPrint</span>. Magento 2 storefront, a fleet of Symfony microservices, Nuxt front-ends, a lot of NATS in between. Back-end code reviews land on my desk. I run the team's Scrum as well.
                        </p>
                        <p style="margin-top: 18px">
                            Before that I ran <span class="text-head">MEN Technology &amp; Media</span> for eight years. My own studio, end to end. Laravel and Vue apps for clients in the Netherlands, from discovery to hosting.
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
                        <div><span class="text-violet">"next_chapter"</span>: <span class="text-lime">"simplicate"</span>,</div>
                        <div><span class="text-violet">"starts"</span>: <span class="text-pink">"2026-06-01"</span>,</div>
                        <div><span class="text-violet">"open_to_roles"</span>: <span style="color: #f87171">false</span>,</div>
                        <div><span class="text-violet">"open_to_talking"</span>: <span class="text-lime">true</span></div>
                    </aside>
                </div>
            </ReadmeFrame>
        </div>
    </div>
</template>

<script setup lang="ts"></script>
