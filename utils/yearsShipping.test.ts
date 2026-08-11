import { describe, expect, it } from 'vitest';

import type { Job } from '~/data/site';

import { yearsShipping } from './yearsShipping';

const JOBS: Job[] = [
    {
        title: 'Junior developer',
        company: 'RAPIDE Internet',
        city: 'Groningen',
        image: '/assets/images/rapide.svg',
        from: '2017-10',
        until: '2018-09',
        description: '',
        type: 'work',
    },
    {
        title: 'Kitchen worker',
        company: 'Bilderberg Landgoed Lauswolt',
        city: 'Beetsterzwaag',
        image: '/assets/images/bilderberg.jpeg',
        from: '2010-10',
        until: '2012-10',
        description: '',
        type: 'work',
    },
];

describe('yearsShipping', () => {
    it('returns whole years on an exact anniversary', () => {
        expect(yearsShipping(JOBS, new Date('2025-10-01'))).toBe(8);
    });

    it('rounds down mid-year', () => {
        expect(yearsShipping(JOBS, new Date('2025-04-01'))).toBe(7);
    });

    it('clamps to zero for a now before the first dev job', () => {
        expect(yearsShipping(JOBS, new Date('2015-01-01'))).toBe(0);
    });
});
