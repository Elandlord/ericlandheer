import { describe, expect, it } from 'vitest';

import { fmtPeriod, TIMELINE } from './site';

describe('fmtPeriod', () => {
    it('formats a from/until range with both months present', () => {
        expect(fmtPeriod('2022-01', '2026-05')).toBe('Jan 2022 → May 2026');
    });

    it('formats a range where from and until fall in the same month', () => {
        expect(fmtPeriod('2021-11', '2021-11')).toBe('Nov 2021 → Nov 2021');
    });

    it('renders "now" when until is null', () => {
        expect(fmtPeriod('2026-06', null)).toBe('Jun 2026 → now');
    });
});

describe('TIMELINE', () => {
    const effectiveEnd = (job: (typeof TIMELINE)[number]) =>
        new Date((job.until || '2099-01') + '-01').getTime();

    it('places entries with no end date (still ongoing) first', () => {
        const [first] = TIMELINE;

        expect(first?.until).toBeNull();
    });

    it('sorts entries by end date, most recent first', () => {
        for (let i = 1; i < TIMELINE.length; i += 1) {
            const previous = TIMELINE[i - 1];
            const current = TIMELINE[i];
            if (!previous || !current) throw new Error('unexpected sparse TIMELINE array');

            expect(effectiveEnd(previous)).toBeGreaterThanOrEqual(effectiveEnd(current));
        }
    });

    it('merges both jobs and education entries', () => {
        const types = new Set(TIMELINE.map((entry) => entry.type));

        expect(types.has('work')).toBe(true);
        expect(types.has('school') || types.has('certification')).toBe(true);
    });
});
