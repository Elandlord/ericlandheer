// @vitest-environment node
import { createRenderer, h, nextTick } from 'vue';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useReveal } from './useReveal';

class FakeClassList {
    private classes = new Set<string>();

    add(...tokens: string[]) {
        tokens.forEach((t) => this.classes.add(t));
    }

    contains(token: string) {
        return this.classes.has(token);
    }
}

class FakeElement {
    classList = new FakeClassList();
    private rectTop: number;

    constructor(rectTop: number) {
        this.rectTop = rectTop;
    }

    getBoundingClientRect() {
        return { top: this.rectTop };
    }
}

class FakeIntersectionObserver {
    static instances: FakeIntersectionObserver[] = [];
    callback: IntersectionObserverCallback;
    observed: Element[] = [];

    constructor(callback: IntersectionObserverCallback) {
        this.callback = callback;
        FakeIntersectionObserver.instances.push(this);
    }

    observe(el: Element) {
        this.observed.push(el);
    }

    unobserve(el: Element) {
        this.observed = this.observed.filter((o) => o !== el);
    }

    disconnect() {
        this.observed = [];
    }

    trigger(el: Element) {
        this.callback(
            [{ target: el, isIntersecting: true } as IntersectionObserverEntry],
            this as unknown as IntersectionObserver,
        );
    }
}

const noop = () => {};

const nodeOps = {
    insert: noop,
    remove: noop,
    createElement: () => ({}),
    createText: noop,
    createComment: noop,
    setText: noop,
    setElementText: noop,
    parentNode: () => null,
    nextSibling: () => null,
    querySelector: () => null,
    setScopeId: noop,
    cloneNode: () => ({}),
    insertStaticContent: () => [null, null],
    patchProp: noop,
};

function mountHost() {
    const renderer = createRenderer(nodeOps as never);
    const HostComponent = {
        setup() {
            useReveal();
            return () => h('div');
        },
    };
    const app = renderer.createApp(HostComponent);
    app.mount({} as never);
    return () => app.unmount();
}

describe('useReveal', () => {
    let inViewEl: FakeElement;
    let belowFoldEl: FakeElement;

    beforeEach(() => {
        vi.useFakeTimers();
        FakeIntersectionObserver.instances = [];

        inViewEl = new FakeElement(10);
        belowFoldEl = new FakeElement(5000);

        (globalThis as never as { window: unknown }).window = { innerHeight: 800 };
        (globalThis as never as { document: unknown }).document = {
            documentElement: { classList: new FakeClassList() },
            querySelectorAll: () => [inViewEl, belowFoldEl],
        };
        (globalThis as never as { IntersectionObserver: unknown }).IntersectionObserver =
            FakeIntersectionObserver;
    });

    afterEach(() => {
        vi.useRealTimers();
        delete (globalThis as never as { window?: unknown }).window;
        delete (globalThis as never as { document?: unknown }).document;
        delete (globalThis as never as { IntersectionObserver?: unknown }).IntersectionObserver;
    });

    it('marks document.documentElement with js-reveal and reveals in-view elements synchronously', async () => {
        mountHost();
        await nextTick();

        expect(
            (document.documentElement as unknown as { classList: FakeClassList }).classList.contains(
                'js-reveal',
            ),
        ).toBe(true);
        expect(inViewEl.classList.contains('in')).toBe(true);
        expect(belowFoldEl.classList.contains('in')).toBe(false);
    });

    it('reveals below-the-fold elements once the IntersectionObserver fires', async () => {
        mountHost();
        await nextTick();

        const [observer] = FakeIntersectionObserver.instances;
        expect(observer).toBeDefined();
        expect(observer!.observed).toContain(belowFoldEl);

        observer!.trigger(belowFoldEl as unknown as Element);

        expect(belowFoldEl.classList.contains('in')).toBe(true);
    });

    it('reveals all remaining elements after the 2s fallback timer fires', async () => {
        mountHost();
        await nextTick();

        expect(belowFoldEl.classList.contains('in')).toBe(false);

        vi.advanceTimersByTime(2000);

        expect(belowFoldEl.classList.contains('in')).toBe(true);
        expect(inViewEl.classList.contains('in')).toBe(true);
    });
});
