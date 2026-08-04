import { describe, expect, it } from 'vitest';

import type { SectionOffset } from './activeSection';
import { resolveActiveSection } from './activeSection';

describe('resolveActiveSection', () => {
    it('returns the fallback when no offset is above the threshold', () => {
        const offsets: SectionOffset[] = [
            { id: 'about', top: 200 },
            { id: 'work', top: 400 },
        ];

        expect(resolveActiveSection(offsets)).toBe('about');
    });

    it('returns the id of a single matching offset', () => {
        const offsets: SectionOffset[] = [
            { id: 'about', top: 200 },
            { id: 'work', top: 50 },
        ];

        expect(resolveActiveSection(offsets)).toBe('work');
    });

    it('returns the last matching offset when multiple are above the threshold', () => {
        const offsets: SectionOffset[] = [
            { id: 'about', top: 10 },
            { id: 'work', top: 20 },
            { id: 'contact', top: 30 },
        ];

        expect(resolveActiveSection(offsets)).toBe('contact');
    });

    it('returns the fallback for an empty offsets array', () => {
        expect(resolveActiveSection([])).toBe('about');
    });

    it('supports a custom fallback and threshold', () => {
        const offsets: SectionOffset[] = [{ id: 'work', top: 90 }];

        expect(resolveActiveSection(offsets, 50, 'home')).toBe('home');
    });
});
