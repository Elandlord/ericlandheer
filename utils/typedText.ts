export interface TypedTextState {
    text: string;
    del: boolean;
    idx: number;
}

export interface TypedTextOptions {
    speed: number;
    pause: number;
}

export interface TypedTextStep extends TypedTextState {
    delayMs: number;
}

export function nextTypedTextStep(
    state: TypedTextState,
    strings: string[],
    options: TypedTextOptions,
): TypedTextStep {
    const { text, del, idx } = state;
    const { speed, pause } = options;
    const cur = strings[idx % strings.length] ?? '';

    if (!del && text === cur) {
        return { text, del: true, idx, delayMs: pause };
    }

    if (del && text === '') {
        return { text, del: false, idx: idx + 1, delayMs: 0 };
    }

    return {
        text: cur.slice(0, del ? text.length - 1 : text.length + 1),
        del,
        idx,
        delayMs: del ? speed / 2 : speed,
    };
}
