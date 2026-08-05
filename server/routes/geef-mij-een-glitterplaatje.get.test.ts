import { afterEach, describe, expect, it, vi } from 'vitest';

import type { Plaatje } from './geef-mij-een-glitterplaatje.get';
import handler, { parseItems, selectPool } from './geef-mij-een-glitterplaatje.get';

const FEED_XML = `<?xml version="1.0" encoding="UTF-8"?>
<rss>
    <channel>
        <item>
            <naam>Fijne maandag</naam>
            <categorie>dagen van de week</categorie>
            <plaatje_groot_url>https://example.test/maandag-groot.gif</plaatje_groot_url>
            <plaatje_klein_url>https://example.test/maandag-klein.gif</plaatje_klein_url>
        </item>
        <item>
            <naam><![CDATA[Gezellige dinsdag]]></naam>
            <categorie><![CDATA[dagen van de week]]></categorie>
            <plaatje_klein_url><![CDATA[https://example.test/dinsdag-klein.gif]]></plaatje_klein_url>
        </item>
        <item>
            <naam>Geen plaatje</naam>
            <categorie>dagen van de week</categorie>
        </item>
    </channel>
</rss>`;

const ITEMS: Plaatje[] = [
    { naam: 'Fijne maandag', url: 'https://example.test/maandag.gif', categorie: 'dagen' },
    { naam: 'Groeten', url: 'https://example.test/dinsdag.gif', categorie: 'dinsdag plaatjes' },
    { naam: 'Zomaar', url: 'https://example.test/zomaar.gif', categorie: 'algemeen' },
];

const MONDAY = 1;
const TUESDAY = 2;
const THURSDAY = 4;

describe('parseItems', () => {
    it('parses every item block that has a usable image url', () => {
        const items = parseItems(FEED_XML);

        expect(items).toHaveLength(2);
    });

    it('prefers plaatje_groot_url over plaatje_klein_url', () => {
        const [first] = parseItems(FEED_XML);

        expect(first).toEqual({
            naam: 'Fijne maandag',
            url: 'https://example.test/maandag-groot.gif',
            categorie: 'dagen van de week',
        });
    });

    it('falls back to plaatje_klein_url and strips CDATA wrappers', () => {
        const [, second] = parseItems(FEED_XML);

        expect(second).toEqual({
            naam: 'Gezellige dinsdag',
            url: 'https://example.test/dinsdag-klein.gif',
            categorie: 'dagen van de week',
        });
    });

    it('skips items without any image url', () => {
        const items = parseItems(FEED_XML);

        expect(items.some((item) => item.naam === 'Geen plaatje')).toBe(false);
    });

    it('returns an empty list for a feed without items', () => {
        expect(parseItems('<rss><channel></channel></rss>')).toEqual([]);
    });
});

describe('selectPool', () => {
    it('matches the day name in the naam field', () => {
        expect(selectPool(ITEMS, MONDAY)).toEqual([ITEMS[0]]);
    });

    it('matches the day name in the categorie field', () => {
        expect(selectPool(ITEMS, TUESDAY)).toEqual([ITEMS[1]]);
    });

    it('falls back to all items when no item matches the day', () => {
        expect(selectPool(ITEMS, THURSDAY)).toEqual(ITEMS);
    });
});

describe('default handler', () => {
    const ALL_DAYS_ITEM_XML = `<rss><channel><item>
        <naam>Elke dag plaatje</naam>
        <categorie>zondag maandag dinsdag woensdag donderdag vrijdag zaterdag</categorie>
        <plaatje_groot_url>https://example.test/elke-dag.gif</plaatje_groot_url>
    </item></channel></rss>`;

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('throws a 502 when the RSS feed fetch fails', async () => {
        vi.stubGlobal('$fetch', vi.fn().mockRejectedValue(new Error('network down')));
        vi.stubGlobal(
            'createError',
            vi.fn((opts) => Object.assign(new Error(opts.statusMessage), opts))
        );

        await expect(handler({} as never)).rejects.toMatchObject({
            statusCode: 502,
            statusMessage: 'Upstream feed unreachable',
        });
    });

    it('throws a 502 when the feed has no usable items', async () => {
        vi.stubGlobal('$fetch', vi.fn().mockResolvedValue('<rss><channel></channel></rss>'));
        vi.stubGlobal(
            'createError',
            vi.fn((opts) => Object.assign(new Error(opts.statusMessage), opts))
        );

        await expect(handler({} as never)).rejects.toMatchObject({
            statusCode: 502,
            statusMessage: 'No items in feed',
        });
    });

    it('throws a 502 when the image fetch fails', async () => {
        vi.stubGlobal('$fetch', vi.fn().mockResolvedValue(ALL_DAYS_ITEM_XML));
        vi.stubGlobal(
            'createError',
            vi.fn((opts) => Object.assign(new Error(opts.statusMessage), opts))
        );
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));

        await expect(handler({} as never)).rejects.toMatchObject({
            statusCode: 502,
            statusMessage: 'Image fetch failed',
        });
    });

    it('returns the image bytes and sets response headers on success', async () => {
        const setHeaderSpy = vi.fn();
        vi.stubGlobal('$fetch', vi.fn().mockResolvedValue(ALL_DAYS_ITEM_XML));
        vi.stubGlobal('setHeader', setHeaderSpy);
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                ok: true,
                headers: new Map([['content-type', 'image/gif']]),
                arrayBuffer: () => Promise.resolve(new Uint8Array([1, 2, 3]).buffer),
            })
        );

        const event = {};
        const result = await handler(event as never);

        expect(result).toEqual(new Uint8Array([1, 2, 3]));
        expect(setHeaderSpy).toHaveBeenCalledWith(event, 'Content-Type', 'image/gif');
        expect(setHeaderSpy).toHaveBeenCalledWith(
            event,
            'Cache-Control',
            'public, max-age=300, s-maxage=300'
        );
    });
});
