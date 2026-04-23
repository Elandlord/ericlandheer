<template>
    <div aria-hidden="true" class="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div class="absolute inset-0 site-grid" />
        <div
            class="absolute blur-[60px]"
            style="top:-250px;left:-200px;width:900px;height:900px;background:radial-gradient(circle, rgba(34,211,238,0.22), transparent 60%);animation:aurora-drift 22s ease-in-out infinite"
        />
        <div
            class="absolute blur-[60px]"
            style="top:200px;right:-250px;width:900px;height:900px;background:radial-gradient(circle, rgba(167,139,250,0.22), transparent 60%);animation:aurora-drift 28s ease-in-out infinite reverse"
        />
        <div
            class="absolute blur-[80px]"
            style="top:900px;left:30%;width:800px;height:800px;background:radial-gradient(circle, rgba(244,114,182,0.18), transparent 60%);animation:aurora-drift 32s ease-in-out infinite"
        />
        <div
            class="absolute blur-[60px]"
            style="top:2000px;right:100px;width:700px;height:700px;background:radial-gradient(circle, rgba(34,211,238,0.15), transparent 60%);animation:aurora-drift 26s ease-in-out infinite"
        />
        <div
            class="absolute left-0 right-0"
            style="top:0;height:140px;background:linear-gradient(180deg, transparent, rgba(34,211,238,0.08), transparent);animation:scan-line 9s linear infinite"
        />
    </div>
</template>

<script setup lang="ts"></script>
