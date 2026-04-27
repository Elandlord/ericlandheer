<template>
    <div id="contact" class="max-w-[1200px] mx-auto px-4 md:px-6 relative z-[2]" style="margin-top: 110px">
        <div class="reveal">
            <VimFrame>
                <div class="grid items-center grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-8 md:gap-10">
                    <div>
                        <div
                            class="font-mono-chrome text-dim"
                            style="font-size: 12px; margin-bottom: 8px"
                        >
                            <span class="text-pink">$</span> echo $MESSAGE
                        </div>
                        <h2
                            class="font-sans font-bold text-head"
                            style="margin:0 0 16px;font-size:clamp(34px, 4.5vw, 56px);letter-spacing:-1px;line-height:1.05"
                        >
                            Like what you see?
                            <span class="text-gradient-shift" style="padding-bottom: 0.08em; display: inline-block">Let's talk.</span>
                        </h2>
                        <p
                            class="text-text"
                            style="margin: 0 0 24px; font-size: 16px; line-height: 1.7; max-width: 520px"
                        >
                            Not open to new roles right now. I'm starting at Simplicate in June 2026. Happy to talk NATS, Symfony, Laravel at scale, agent infrastructure. Coffee in Groningen works too.
                        </p>
                        <div class="flex flex-wrap gap-[10px]">
                            <a
                                href="https://github.com/Elandlord"
                                target="_blank"
                                rel="noopener"
                                class="font-mono-chrome text-head no-underline inline-flex items-center gap-2"
                                style="font-size:13px;padding:12px 20px;border:1px solid #22d3ee55;background:linear-gradient(90deg, rgba(34,211,238,0.15), rgba(167,139,250,0.15))"
                            >
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2 .37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                                </svg>
                                github.com/Elandlord
                            </a>
                            <a
                                href="https://linkedin.com/in/ericlandheer"
                                target="_blank"
                                rel="noopener"
                                class="font-mono-chrome text-text no-underline"
                                style="font-size:13px;padding:12px 20px;border:1px solid rgba(148,163,184,0.14)"
                            >linkedin</a>
                        </div>
                    </div>
                    <div
                        class="font-mono-chrome border border-line p-4 md:p-6 overflow-x-auto"
                        style="font-size:13px;line-height:1.8;background:rgba(3,6,17,0.7)"
                    >
                        <div class="text-dim" style="margin-bottom: 10px"># where to find me</div>
                        <div>
                            <span class="text-violet">const</span>
                            <span class="text-cyan">eric</span>
                            <span class="text-amber">=</span> {
                        </div>
                        <div>&nbsp;&nbsp;<span class="text-text">github</span>: <span class="text-lime">"Elandlord"</span>,</div>
                        <div>&nbsp;&nbsp;<span class="text-text">linkedin</span>: <span class="text-lime">"ericlandheer"</span>,</div>
                        <div>&nbsp;&nbsp;<span class="text-text">city</span>: <span class="text-lime">"Groningen, NL"</span>,</div>
                        <div>&nbsp;&nbsp;<span class="text-text">next</span>: <span class="text-lime">"Simplicate, Jun 2026"</span>,</div>
                        <div>}<span class="text-amber">;</span></div>
                        <div class="text-dim" style="margin-top: 16px"># reply time:</div>
                        <div>
                            <span class="text-cyan">usually same-day,</span>
                            <span class="text-dim">weekdays, CET</span>
                        </div>
                    </div>
                </div>
            </VimFrame>
        </div>
    </div>
</template>

<script setup lang="ts"></script>
