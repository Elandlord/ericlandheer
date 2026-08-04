const identity = (handler: unknown) => handler;

Object.assign(globalThis, {
    defineEventHandler: identity,
    defineCachedEventHandler: identity,
});
