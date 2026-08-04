import { describe, expect, it } from 'vitest';

import { easeInOut, hueRgb, lerpColor } from './asciiPortraitMath';

const BLACK: [number, number, number] = [0, 0, 0];
const WHITE: [number, number, number] = [255, 255, 255];
const MIXED: [number, number, number] = [10, 20, 30];

const HIGH_CHANNEL = 232.152;
const LOW_CHANNEL = 114.648;

const HUE_CASES: Array<[number, [number, number, number]]> = [
    [0, [HIGH_CHANNEL, LOW_CHANNEL, LOW_CHANNEL]],
    [60, [HIGH_CHANNEL, HIGH_CHANNEL, LOW_CHANNEL]],
    [120, [LOW_CHANNEL, HIGH_CHANNEL, LOW_CHANNEL]],
    [180, [LOW_CHANNEL, HIGH_CHANNEL, HIGH_CHANNEL]],
    [240, [LOW_CHANNEL, LOW_CHANNEL, HIGH_CHANNEL]],
    [300, [HIGH_CHANNEL, LOW_CHANNEL, HIGH_CHANNEL]],
];

const EASE_SAMPLES = [0, 0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9, 1];

describe('lerpColor', () => {
    it('returns the first color at t=0', () => {
        expect(lerpColor(MIXED, WHITE, 0)).toEqual(MIXED);
    });

    it('returns the second color at t=1', () => {
        expect(lerpColor(MIXED, WHITE, 1)).toEqual(WHITE);
    });

    it('returns the midpoint at t=0.5', () => {
        expect(lerpColor(BLACK, WHITE, 0.5)).toEqual([127.5, 127.5, 127.5]);
        expect(lerpColor(MIXED, WHITE, 0.5)).toEqual([132.5, 137.5, 142.5]);
    });
});

describe('hueRgb', () => {
    it.each(HUE_CASES)('maps hue %i to the expected RGB triple', (hue, expected) => {
        const [r, g, b] = hueRgb(hue);

        expect(r).toBeCloseTo(expected[0], 3);
        expect(g).toBeCloseTo(expected[1], 3);
        expect(b).toBeCloseTo(expected[2], 3);
    });

    it('keeps every channel within 0-255', () => {
        for (let hue = 0; hue <= 360; hue += 5) {
            for (const channel of hueRgb(hue)) {
                expect(channel).toBeGreaterThanOrEqual(0);
                expect(channel).toBeLessThanOrEqual(255);
            }
        }
    });
});

describe('easeInOut', () => {
    it('anchors at 0, 0.5 and 1', () => {
        expect(easeInOut(0)).toBe(0);
        expect(easeInOut(0.5)).toBe(0.5);
        expect(easeInOut(1)).toBe(1);
    });

    it('is monotonically non-decreasing', () => {
        let previous = -Infinity;

        for (const sample of EASE_SAMPLES) {
            const value = easeInOut(sample);

            expect(value).toBeGreaterThanOrEqual(previous);
            previous = value;
        }
    });
});
