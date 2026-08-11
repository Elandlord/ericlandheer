import { afterEach, describe, expect, it, vi } from 'vitest';

import handler from './sitemap.xml.get';

describe('sitemap.xml handler', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('returns valid XML containing the root URL', async () => {
        vi.stubGlobal('setHeader', vi.fn());

        const result = await handler({} as never);

        expect(result).toContain('<?xml version="1.0" encoding="UTF-8"?>');
        expect(result).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
        expect(result).toContain('<loc>https://ericlandheer.nl/</loc>');
    });

    it('sets the content-type header to application/xml', async () => {
        const setHeaderSpy = vi.fn();
        vi.stubGlobal('setHeader', setHeaderSpy);

        const event = {};
        await handler(event as never);

        expect(setHeaderSpy).toHaveBeenCalledWith(event, 'Content-Type', 'application/xml');
    });
});
