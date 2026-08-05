import { describe, expect, it } from 'vitest';

import { fileFor, shikiLang } from './skillFilename';

describe('fileFor', () => {
    it('returns Dockerfile for docker lang regardless of name', () => {
        expect(fileFor({ name: 'anything', lang: 'docker' })).toBe('Dockerfile');
    });

    it.each([
        ['php', '.php'],
        ['vue', '.vue'],
        ['html', '.html'],
        ['go', '.go'],
        ['yaml', '.yml'],
    ])('maps known lang %s to extension %s', (lang, ext) => {
        expect(fileFor({ name: 'sample', lang })).toBe(`sample${ext}`);
    });

    it('falls back to .txt for an unknown lang', () => {
        expect(fileFor({ name: 'sample', lang: 'rust' })).toBe('sample.txt');
    });

    it('sanitizes names with spaces and punctuation to kebab-case', () => {
        expect(fileFor({ name: 'Node.js', lang: 'unknown' })).toBe('node-js.txt');
    });
});

describe('shikiLang', () => {
    it('maps docker to dockerfile', () => {
        expect(shikiLang('docker')).toBe('dockerfile');
    });

    it('maps yaml to yaml', () => {
        expect(shikiLang('yaml')).toBe('yaml');
    });

    it('passes other langs through unchanged', () => {
        expect(shikiLang('php')).toBe('php');
    });
});
