import { describe, expect, it } from 'vitest';

import { SKILLS } from '../data/site';
import { hasPreview, normalizeSelfClosingTags, previewDocument } from './skillPreview';

describe('hasPreview', () => {
    it('is true when the skill declares a preview', () => {
        expect(hasPreview({ preview: { kind: 'html', note: 'note' } })).toBe(true);
    });

    it('is false when the skill declares no preview', () => {
        expect(hasPreview({})).toBe(false);
    });

    it.each(['Tailwind CSS', 'Vue & Nuxt'])('marks %s as previewable', (name) => {
        const skill = SKILLS.find((s) => s.name === name);

        expect(skill && hasPreview(skill)).toBe(true);
    });

    it.each(['Laravel & Symfony', 'Docker & Kubernetes', 'Go', 'Event-driven systems'])(
        'leaves %s without a preview because it has no browser runtime',
        (name) => {
            const skill = SKILLS.find((s) => s.name === name);

            expect(skill && hasPreview(skill)).toBe(false);
        },
    );
});

describe('normalizeSelfClosingTags', () => {
    it('expands a self-closing div, which raw HTML would parse as an open tag', () => {
        expect(normalizeSelfClosingTags('<div class="a" />')).toBe('<div class="a"></div>');
    });

    it('keeps void elements self-closing', () => {
        expect(normalizeSelfClosingTags('<img src="a.png" />')).toBe('<img src="a.png" />');
    });

    it('leaves regular open and close tags untouched', () => {
        expect(normalizeSelfClosingTags('<p>hi</p>')).toBe('<p>hi</p>');
    });

    it('handles slashes inside attribute values', () => {
        expect(normalizeSelfClosingTags('<span data-x="a/b" />')).toBe('<span data-x="a/b"></span>');
    });

    it('expands every self-closing tag in a multiline snippet', () => {
        const out = normalizeSelfClosingTags('<div class="x"\n    data-y="1" />\n<div />');

        expect(out).toContain('data-y="1"></div>');
        expect(out).toContain('<div></div>');
    });

    it('closes the sibling text block of the Tailwind snippet instead of nesting it', () => {
        const skill = SKILLS.find((s) => s.name === 'Tailwind CSS')!;

        expect(normalizeSelfClosingTags(skill.code)).not.toMatch(/\/>/);
    });
});

describe('previewDocument', () => {
    const doc = previewDocument('<p class="text-pink-400">hi</p>');

    it('produces a standalone html document', () => {
        expect(doc.startsWith('<!doctype html>')).toBe(true);
        expect(doc).toContain('</html>');
    });

    it('embeds the snippet verbatim in the body', () => {
        expect(doc).toContain('<p class="text-pink-400">hi</p>');
    });

    it('loads Tailwind so utility classes resolve inside the frame', () => {
        expect(doc).toContain('https://cdn.tailwindcss.com');
    });

    it('paints the site background so the frame matches the page', () => {
        expect(doc).toContain('#050814');
    });

    it('embeds the Tailwind skill snippet with its self-closing tags expanded', () => {
        const skill = SKILLS.find((s) => s.name === 'Tailwind CSS')!;

        expect(previewDocument(skill.code)).toContain(normalizeSelfClosingTags(skill.code));
    });
});
