import { describe, expect, it } from 'vitest';

import { computeCountUpValue } from './countUp';

const DURATION = 900;
const TARGET = 250;

function easeOutCubic(elapsedMs: number, durationMs: number, to: number): number {
    return Math.round(to * (1 - Math.pow(1 - elapsedMs / durationMs, 3)));
}

describe('computeCountUpValue', () => {
    it('starts at zero when no time has elapsed', () => {
        expect(computeCountUpValue(0, DURATION, TARGET)).toBe(0);
    });

    it('reaches the target when the duration has elapsed', () => {
        expect(computeCountUpValue(DURATION, DURATION, TARGET)).toBe(TARGET);
    });

    it('clamps to the target when elapsed time exceeds the duration', () => {
        expect(computeCountUpValue(DURATION * 3, DURATION, TARGET)).toBe(TARGET);
    });

    it('follows the ease-out cubic curve halfway through', () => {
        expect(computeCountUpValue(DURATION / 2, DURATION, TARGET)).toBe(
            easeOutCubic(DURATION / 2, DURATION, TARGET),
        );
    });

    it('follows the ease-out cubic curve for another progress point', () => {
        expect(computeCountUpValue(200, 1000, 42)).toBe(easeOutCubic(200, 1000, 42));
    });

    it('stays at zero for a zero target', () => {
        expect(computeCountUpValue(DURATION / 2, DURATION, 0)).toBe(0);
    });

    it('counts down towards a negative target', () => {
        expect(computeCountUpValue(DURATION, DURATION, -TARGET)).toBe(-TARGET);
    });

    it('returns the target when the duration is zero', () => {
        expect(computeCountUpValue(0, 0, TARGET)).toBe(TARGET);
    });

    it('returns the target when the duration is negative', () => {
        expect(computeCountUpValue(10, -100, TARGET)).toBe(TARGET);
    });
});
