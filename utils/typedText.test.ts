import { describe, expect, it } from 'vitest';

import type { TypedTextState } from './typedText';
import { nextTypedTextStep } from './typedText';

const STRINGS = ['ab', 'cd'];
const SPEED = 40;
const PAUSE = 1600;
const OPTIONS = { speed: SPEED, pause: PAUSE };
const HALF_SPEED = SPEED / 2;
const NO_DELAY = 0;
const START: TypedTextState = { text: '', del: false, idx: 0 };

describe('nextTypedTextStep', () => {
    it('types the current string one character at a time', () => {
        // #given
        const state = START;

        // #when
        const result = nextTypedTextStep(state, STRINGS, OPTIONS);

        // #then
        expect(result).toEqual({ text: 'a', del: false, idx: 0, delayMs: SPEED });
    });

    it('keeps typing from a partial string', () => {
        // #given
        const state: TypedTextState = { text: 'a', del: false, idx: 0 };

        // #when
        const result = nextTypedTextStep(state, STRINGS, OPTIONS);

        // #then
        expect(result).toEqual({ text: 'ab', del: false, idx: 0, delayMs: SPEED });
    });

    it('pauses once the text equals the current string', () => {
        // #given
        const state: TypedTextState = { text: 'ab', del: false, idx: 0 };

        // #when
        const result = nextTypedTextStep(state, STRINGS, OPTIONS);

        // #then
        expect(result).toEqual({ text: 'ab', del: true, idx: 0, delayMs: PAUSE });
    });

    it('deletes one character at half speed while deleting', () => {
        // #given
        const state: TypedTextState = { text: 'ab', del: true, idx: 0 };

        // #when
        const result = nextTypedTextStep(state, STRINGS, OPTIONS);

        // #then
        expect(result).toEqual({ text: 'a', del: true, idx: 0, delayMs: HALF_SPEED });
    });

    it('advances to the next string once the text is deleted to empty', () => {
        // #given
        const state: TypedTextState = { text: '', del: true, idx: 0 };

        // #when
        const result = nextTypedTextStep(state, STRINGS, OPTIONS);

        // #then
        expect(result).toEqual({ text: '', del: false, idx: 1, delayMs: NO_DELAY });
    });

    it('types the next string after advancing the index', () => {
        // #given
        const state: TypedTextState = { text: '', del: false, idx: 1 };

        // #when
        const result = nextTypedTextStep(state, STRINGS, OPTIONS);

        // #then
        expect(result).toEqual({ text: 'c', del: false, idx: 1, delayMs: SPEED });
    });

    it('wraps around from the last string back to the first', () => {
        // #given
        const state: TypedTextState = { text: '', del: false, idx: STRINGS.length };

        // #when
        const result = nextTypedTextStep(state, STRINGS, OPTIONS);

        // #then
        expect(result).toEqual({ text: 'a', del: false, idx: STRINGS.length, delayMs: SPEED });
    });

    it('cycles a single-string array without stalling', () => {
        // #given
        const single = ['hi'];
        let state: TypedTextState = START;
        const texts: string[] = [];

        // #when
        for (let i = 0; i < 8; i += 1) {
            const { delayMs, ...next } = nextTypedTextStep(state, single, OPTIONS);
            state = next;
            texts.push(`${state.text}${state.del ? '-' : '+'}`);
        }

        // #then
        expect(texts).toEqual(['h+', 'hi+', 'hi-', 'h-', '-', '+', 'h+', 'hi+']);
    });
});
