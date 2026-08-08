import { describe, expect, it } from 'vitest';

import { describeRepoSummary } from './repoSummary';

describe('describeRepoSummary', () => {
    it('returns zero repos for an empty list', () => {
        const result = describeRepoSummary([]);

        expect(result).toBe('0 repos');
    });

    it('returns singular wording for a single package', () => {
        const result = describeRepoSummary([{ lang: 'PHP' }]);

        expect(result).toBe('1 repo · PHP');
    });

    it('returns plural wording when two packages share a language', () => {
        const result = describeRepoSummary([{ lang: 'PHP' }, { lang: 'PHP' }]);

        expect(result).toBe('2 repos · PHP');
    });

    it('returns a mixed fallback when packages have different languages', () => {
        const result = describeRepoSummary([{ lang: 'PHP' }, { lang: 'Go' }]);

        expect(result).toBe('2 repos · mixed');
    });
});
