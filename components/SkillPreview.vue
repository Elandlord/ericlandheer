<template>
    <div>
        <iframe
            v-if="skill.preview?.kind === 'html'"
            :key="skill.name"
            :srcdoc="previewDocument(skill.code)"
            :title="`${skill.name} preview`"
            sandbox="allow-scripts"
            loading="lazy"
            class="w-full border border-line"
            style="height: 360px; background: #050814"
        />
        <SkillPreviewKonami v-else-if="skill.preview?.kind === 'konami'" :key="`konami-${skill.name}`" />
        <p
            v-if="skill.preview"
            class="font-mono-chrome text-dim"
            style="font-size: 11px; margin-top: 10px"
        >{{ skill.preview.note }}</p>
    </div>
</template>

<script setup lang="ts">
import type { Skill } from '~/data/site';
import { previewDocument } from '~/utils/skillPreview';

defineProps<{ skill: Skill }>();
</script>
