<template>
    <div class="relative z-10">
        <SiteNav />
        <main>
            <Hero />
            <MiniTerminal />
            <About />
            <Skills />
            <Experience />
            <Lab />
            <Projects />
            <Contact />
            <SiteFooter />
        </main>
    </div>
</template>

<script setup lang="ts">
import { useReveal } from '~/composables/useReveal';

useReveal();
</script>
