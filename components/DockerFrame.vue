<template>
    <section
        class="border border-line"
        style="background: rgba(10,15,31,0.78); box-shadow: 0 20px 60px -20px rgba(0,0,0,0.6)"
    >
        <div
            class="px-4 py-3 border-b border-line flex items-center gap-3 font-mono-chrome text-[12px]"
            style="color: #7d8590"
        >
            <img src="/assets/images/docker.png" alt="" style="width: 18px; height: 18px" />
            <span class="text-cyan">$</span>
            <span style="color: #e6edf3">docker compose</span>
            <span class="text-violet">ps --format table</span>
            <span class="ml-auto">project: <span class="text-cyan">~/lab</span></span>
            <span>·</span>
            <span class="text-lime">● all services healthy</span>
        </div>
        <slot />
    </section>
</template>

<script setup lang="ts"></script>
