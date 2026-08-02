const noop = () => undefined;

Object.assign(globalThis, {
    defineEventHandler: noop,
    defineCachedEventHandler: noop,
});
