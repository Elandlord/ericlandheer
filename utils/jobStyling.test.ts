import { describe, expect, it } from 'vitest';

import { jobDotStyle, jobPillLabel, jobPillStyle, jobTypeColor } from './jobStyling';

describe('jobTypeColor', () => {
    it('returns amber for the current work job', () => {
        expect(jobTypeColor({ type: 'work', until: null })).toBe('#fbbf24');
    });

    it('returns cyan for a past work job', () => {
        expect(jobTypeColor({ type: 'work', until: '2020-01' })).toBe('#22d3ee');
    });

    it('returns violet for a school job', () => {
        expect(jobTypeColor({ type: 'school', until: '2019-01' })).toBe('#a78bfa');
    });

    it('returns pink for a certification', () => {
        expect(jobTypeColor({ type: 'certification', until: '2021-01' })).toBe('#f472b6');
    });
});

describe('jobDotStyle', () => {
    it('uses the amber glow box-shadow for the current work job', () => {
        const style = jobDotStyle({ type: 'work', until: null });

        expect(style.background).toBe('#fbbf24');
        expect(style.boxShadow).toBe('0 0 0 4px #fbbf2422, 0 0 14px #fbbf24');
    });

    it('uses the default ring box-shadow for a past work job', () => {
        const style = jobDotStyle({ type: 'work', until: '2020-01' });

        expect(style.background).toBe('#22d3ee');
        expect(style.boxShadow).toBe('0 0 0 3px #050814');
    });
});

describe('jobPillLabel', () => {
    it('returns EDU for school', () => {
        expect(jobPillLabel('school')).toBe('EDU');
    });

    it('returns CERT for certification', () => {
        expect(jobPillLabel('certification')).toBe('CERT');
    });

    it('returns WORK for work', () => {
        expect(jobPillLabel('work')).toBe('WORK');
    });
});

describe('jobPillStyle', () => {
    it('uses the pink color for certification pills, distinct from jobTypeColor', () => {
        const style = jobPillStyle('certification');

        expect(style.color).toBe('#fbbf24');
        expect(jobTypeColor({ type: 'certification', until: '2021-01' })).toBe('#f472b6');
    });

    it('builds border and background from the mapped color with alpha suffixes', () => {
        const style = jobPillStyle('work');

        expect(style.color).toBe('#22d3ee');
        expect(style.border).toBe('1px solid #22d3ee55');
        expect(style.background).toBe('#22d3ee11');
    });
});
