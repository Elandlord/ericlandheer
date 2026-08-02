import { describe, expect, it } from 'vitest';

import type { GithubRepo } from './repos.get';
import { toRepoSummaries } from './repos.get';

const MAX_REPOS = 12;

function makeRepo(overrides: Partial<GithubRepo> = {}): GithubRepo {
    return {
        name: 'website',
        html_url: 'https://github.com/Elandlord/website',
        description: 'Personal site',
        language: 'TypeScript',
        stargazers_count: 3,
        forks_count: 1,
        fork: false,
        archived: false,
        pushed_at: '2025-01-01T00:00:00Z',
        topics: ['nuxt'],
        ...overrides,
    };
}

describe('toRepoSummaries', () => {
    it('maps a repo onto its summary shape', () => {
        const [summary] = toRepoSummaries([makeRepo()]);

        expect(summary).toEqual({
            name: 'website',
            url: 'https://github.com/Elandlord/website',
            description: 'Personal site',
            language: 'TypeScript',
            stars: 3,
            forks: 1,
            pushedAt: '2025-01-01T00:00:00Z',
            topics: ['nuxt'],
        });
    });

    it('excludes forks and archived repos', () => {
        const summaries = toRepoSummaries([
            makeRepo({ name: 'kept' }),
            makeRepo({ name: 'forked', fork: true }),
            makeRepo({ name: 'archived', archived: true }),
        ]);

        expect(summaries.map((s) => s.name)).toEqual(['kept']);
    });

    it('sorts descending by pushed_at', () => {
        const summaries = toRepoSummaries([
            makeRepo({ name: 'oldest', pushed_at: '2023-06-01T00:00:00Z' }),
            makeRepo({ name: 'newest', pushed_at: '2025-06-01T00:00:00Z' }),
            makeRepo({ name: 'middle', pushed_at: '2024-06-01T00:00:00Z' }),
        ]);

        expect(summaries.map((s) => s.name)).toEqual(['newest', 'middle', 'oldest']);
    });

    it('caps the result at twelve repos', () => {
        const repos = Array.from({ length: 20 }, (_, i) =>
            makeRepo({ name: `repo-${i}`, pushed_at: `2025-01-${String(i + 1).padStart(2, '0')}T00:00:00Z` }),
        );

        const summaries = toRepoSummaries(repos);

        expect(summaries).toHaveLength(MAX_REPOS);
        expect(summaries[0]?.name).toBe('repo-19');
    });

    it('defaults a null description to an empty string and missing topics to an empty list', () => {
        const [summary] = toRepoSummaries([makeRepo({ description: null, topics: undefined })]);

        expect(summary?.description).toBe('');
        expect(summary?.topics).toEqual([]);
    });

    it('returns an empty list for no repos', () => {
        expect(toRepoSummaries([])).toEqual([]);
    });
});
