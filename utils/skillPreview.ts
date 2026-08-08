import type { Skill } from '~/data/site';

const TAILWIND_CDN = 'https://cdn.tailwindcss.com';

const VOID_TAGS = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
    'link', 'meta', 'param', 'source', 'track', 'wbr',
]);

const SELF_CLOSING = /<([a-zA-Z][\w-]*)((?:"[^"]*"|'[^']*'|[^>"'])*?)\s*\/>/g;

export function hasPreview(skill: Pick<Skill, 'preview'>): boolean {
    return skill.preview !== undefined;
}

export function normalizeSelfClosingTags(markup: string): string {
    return markup.replace(SELF_CLOSING, (match, tag: string, attrs: string) =>
        VOID_TAGS.has(tag.toLowerCase()) ? match : `<${tag}${attrs}></${tag}>`,
    );
}

export function previewDocument(code: string): string {
    return `<!doctype html>
<html lang="en" class="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="${TAILWIND_CDN}"></script>
<style>html,body{margin:0;background:#050814;color:#f1f5f9;font-family:ui-sans-serif,system-ui,sans-serif}</style>
</head>
<body>
${normalizeSelfClosingTags(code)}
</body>
</html>`;
}
