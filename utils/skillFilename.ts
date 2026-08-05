import type { Skill } from '~/data/site';

export function fileFor(skill: Pick<Skill, 'name' | 'lang'>): string {
    if (skill.lang === 'docker') return 'Dockerfile';
    const exts: Record<string, string> = { php: '.php', vue: '.vue', html: '.html', go: '.go', yaml: '.yml' };
    return skill.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + (exts[skill.lang] ?? '.txt');
}

export function shikiLang(lang: string): string {
    if (lang === 'docker') return 'dockerfile';
    if (lang === 'yaml') return 'yaml';
    return lang;
}
