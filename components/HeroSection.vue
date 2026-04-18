<template>
    <section id="about" class="relative isolate overflow-hidden pt-32 pb-24 sm:pt-40">
        <div class="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div class="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

        <div class="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16 lg:px-8">
            <div ref="textRef">
                <div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                    <span class="relative flex h-2 w-2">
                        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                        <span class="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                    </span>
                    Based in Groningen · Starting at Simplicate in June 2026
                </div>

                <h1 class="mt-6 font-display text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                    Full stack engineer
                    <span class="text-gradient">building pragmatic,<br />scalable software.</span>
                </h1>

                <p class="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                    I started building for the web at 15 and still enjoy turning complex ideas into reliable experiences. Laravel, Symfony and Vue are my baseline. I also reach for Go, NATS and cloud tooling when a problem asks for it.
                </p>

                <div class="mt-9 flex flex-wrap items-center gap-3">
                    <a
                        href="#experience"
                        class="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-accent to-indigo-500 px-5 py-2.5 text-sm font-semibold text-ink-950 shadow-lg shadow-accent/30 transition hover:shadow-accent/50"
                    >
                        <span>See my work</span>
                        <Icon name="ph:arrow-right-bold" class="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </a>
                    <a
                        href="https://github.com/Elandlord"
                        target="_blank"
                        rel="noreferrer"
                        class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                        <Icon name="mdi:github" class="h-4 w-4" />
                        GitHub
                    </a>
                </div>

                <dl class="mt-10 grid max-w-md grid-cols-3 gap-6">
                    <div>
                        <dt class="text-xs uppercase tracking-[0.2em] text-slate-500">Years shipping</dt>
                        <dd class="mt-1 font-display text-2xl font-bold text-white">10+</dd>
                    </div>
                    <div>
                        <dt class="text-xs uppercase tracking-[0.2em] text-slate-500">Stack</dt>
                        <dd class="mt-1 font-display text-2xl font-bold text-white">PHP · TS · Go</dd>
                    </div>
                    <div>
                        <dt class="text-xs uppercase tracking-[0.2em] text-slate-500">Home</dt>
                        <dd class="mt-1 font-display text-2xl font-bold text-white">NL 🇳🇱</dd>
                    </div>
                </dl>
            </div>

            <div class="relative mx-auto w-full max-w-md" ref="cardRef">
                <div
                    class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.35),transparent_60%)] blur-2xl"
                />
                <img
                    src="/assets/images/eric.png"
                    alt="Portrait of Eric Landheer"
                    class="relative h-auto w-full select-none"
                    @mousemove="onTilt"
                    @mouseleave="resetTilt"
                    :style="tiltStyle"
                    draggable="false"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

const textRef = ref<HTMLElement | null>(null);
const cardRef = ref<HTMLElement | null>(null);

const tiltX = ref(0);
const tiltY = ref(0);

const tiltStyle = computed(() => ({
    transform: `perspective(1000px) rotateX(${tiltY.value}deg) rotateY(${tiltX.value}deg)`,
    transition: 'transform 0.2s ease-out',
}));

const onTilt = (e: MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    tiltX.value = x * 12;
    tiltY.value = -y * 12;
};

const resetTilt = () => {
    tiltX.value = 0;
    tiltY.value = 0;
};

onMounted(async () => {
    if (typeof window === 'undefined') return;
    const { default: gsap } = await import('gsap');

    if (textRef.value) {
        gsap.from(textRef.value.querySelectorAll('h1, p, .inline-flex, dl, a'), {
            y: 24,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.08,
        });
    }
    if (cardRef.value) {
        gsap.from(cardRef.value, {
            y: 40,
            opacity: 0,
            duration: 1.1,
            ease: 'power3.out',
            delay: 0.2,
        });
    }
});
</script>
