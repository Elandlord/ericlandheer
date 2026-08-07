import { describe, expect, it } from 'vitest';

import { describeCurrentRole } from './employmentStatus';

describe('describeCurrentRole', () => {
    it('returns starting when the role begins after now', () => {
        const result = describeCurrentRole(
            { from: '2026-06', company: 'Simplicate' },
            new Date('2026-01-15')
        );

        expect(result.verb).toBe('starting');
        expect(result.label).toBe('Jun 2026');
    });

    it('returns joined when the role began before now', () => {
        const result = describeCurrentRole(
            { from: '2026-06', company: 'Simplicate' },
            new Date('2026-08-07')
        );

        expect(result.verb).toBe('joined');
        expect(result.label).toBe('Jun 2026');
    });

    it('returns joined when now is in the same month as from', () => {
        const result = describeCurrentRole(
            { from: '2026-06', company: 'Simplicate' },
            new Date('2026-06-15')
        );

        expect(result.verb).toBe('joined');
        expect(result.label).toBe('Jun 2026');
    });
});
