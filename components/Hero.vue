<template>
    <header id="top" class="relative z-[2] pt-8 md:pt-12 pb-7">
        <div class="max-w-[1200px] mx-auto px-4 md:px-6">
            <div
                class="reveal grid items-center grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-10 md:gap-14"
            >
                <div>
                    <div
                        class="font-mono-chrome text-[12px] text-dim flex items-center gap-[10px] border border-line px-3 py-[8px] w-full"
                        style="letter-spacing: 0.6px; background: rgba(10,15,31,0.7); min-height: 34px"
                    >
                        <span
                            class="shrink-0 block rounded-full"
                            style="width:7px;height:7px;background:#a3e635;box-shadow:0 0 10px #a3e635"
                        />
                        <span class="text-text shrink-0">based in Groningen</span>
                        <span class="text-dim shrink-0">·</span>
                        <span class="text-amber truncate">starting at simplicate, june 2026</span>
                    </div>
                    <h1
                        class="font-sans font-bold text-head"
                        style="margin: 24px 0 14px; font-size: clamp(38px, 8vw, 84px); line-height: 1; letter-spacing: -1.5px"
                    >
                        Full stack engineer<br />
                        <span class="text-gradient-shift" style="padding-bottom: 0.08em; display: inline-block">building pragmatic,<br />scalable software.</span>
                    </h1>
                    <p
                        class="text-text"
                        style="margin-top: 20px; max-width: 540px; font-size: 17.5px; line-height: 1.6"
                    >
                        Started building for the web at <strong class="text-head">15</strong>. Still enjoy turning complex ideas into reliable software. Laravel, Symfony and Vue are my baseline.
                        <span class="text-cyan">Go</span>,
                        <span class="text-violet">NATS</span>
                        and cloud tooling join when a problem calls for them.
                    </p>
                    <div
                        class="font-mono-chrome text-[14px] text-dim flex items-center gap-[10px]"
                        style="margin-top: 28px; white-space: nowrap; min-height: 22px; overflow: hidden"
                    >
                        <span class="text-pink shrink-0">$</span>
                        <span class="text-text shrink-0">currently</span>
                        <span class="text-dim shrink-0">=</span>
                        <span class="text-cyan min-w-0 truncate">
                            "<TypedText :strings="typedStrings" />"
                        </span>
                    </div>
                    <div class="flex gap-3 flex-wrap" style="margin-top: 34px">
                        <a
                            href="#experience"
                            class="font-mono-chrome text-[13px] text-head no-underline inline-flex items-center gap-2"
                            style="padding: 12px 20px; border: 1px solid #22d3ee55; background: linear-gradient(90deg, rgba(34,211,238,0.15), rgba(167,139,250,0.15))"
                        >
                            <span class="text-pink">▸</span> see my work
                        </a>
                        <a
                            href="#contact"
                            class="font-mono-chrome text-[13px] text-text no-underline"
                            style="padding: 12px 20px; border: 1px solid rgba(148,163,184,0.14)"
                        >get in touch</a>
                    </div>
                </div>
                <div class="flex justify-center relative">
                    <div
                        class="relative p-[14px] md:p-[22px] border border-line w-full md:w-auto"
                        style="background: rgba(10,15,31,0.8); box-shadow: 0 30px 80px -20px rgba(34,211,238,0.25), inset 0 1px 0 rgba(255,255,255,0.04)"
                    >
                        <Corners color="#22d3ee" />
                        <div
                            class="flex items-center gap-[10px] font-mono-chrome text-[11px] text-dim"
                            style="margin-bottom: 14px"
                        >
                            <TrafficLights />
                            <span>eric.png → ascii.txt</span>
                            <span class="ml-auto text-lime">● live</span>
                        </div>
                        <AsciiPortrait :scale="1.15" :loop="true" :morph-ms="2600" :hold-ms="2400" />
                        <div
                            class="font-mono-chrome text-dim flex justify-between"
                            style="font-size: 10.5px; margin-top: 14px"
                        >
                            <span>110×60 · 64 glyph ramp</span>
                            <span class="text-pink">click to replay ↻</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
const typedStrings = [
    'shipping print infrastructure @ peterprint',
    'packing for simplicate (june 2026)',
    'wiring LLM agents into pixel villages',
    'writing RAG over my obsidian vault',
    'reviewing code & coaching my squad',
];
</script>
