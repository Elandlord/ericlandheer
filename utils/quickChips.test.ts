import { describe, expect, it } from 'vitest';

import { buildQuickChips } from './quickChips';

describe('buildQuickChips', () => {
    it('returns only help for an empty sections array', () => {
        expect(buildQuickChips([])).toEqual(['help']);
    });

    it('preserves section id order and appends help once at the end', () => {
        const sections = [{ id: 'about' }, { id: 'skills' }, { id: 'experience' }];

        expect(buildQuickChips(sections)).toEqual(['about', 'skills', 'experience', 'help']);
    });

    it('produces no duplicate ids', () => {
        const sections = [{ id: 'about' }, { id: 'skills' }];
        const chips = buildQuickChips(sections);

        expect(new Set(chips).size).toBe(chips.length);
    });
});
