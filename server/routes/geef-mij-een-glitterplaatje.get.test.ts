import { describe, expect, it } from 'vitest';

import type { Plaatje } from './geef-mij-een-glitterplaatje.get';
import { parseItems, selectPool } from './geef-mij-een-glitterplaatje.get';

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
