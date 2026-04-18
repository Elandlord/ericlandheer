const RSS_URL = 'https://www.deelplaatjes.nl/webmasters/rss?i=dagen-vd-week';
const DAYS_NL = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];
const USER_AGENT = 'ericlandheer.nl/2.0 (+https://ericlandheer.nl)';

interface Plaatje {
    naam: string;
    url: string;
    categorie: string;
}

function parseItems(xml: string): Plaatje[] {
    const items: Plaatje[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const get = (block: string, tag: string) => {
        const m = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
        return m ? m[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim() : '';
    };

    let match: RegExpExecArray | null;
    while ((match = itemRegex.exec(xml)) !== null) {
        const block = match[1];
        const url = get(block, 'plaatje_groot_url') || get(block, 'plaatje_klein_url');
        if (!url) continue;
        items.push({ naam: get(block, 'naam'), url, categorie: get(block, 'categorie') });
    }
    return items;
}

export default defineEventHandler(async (event) => {
    const today = DAYS_NL[new Date().getDay()];

    let xml: string;
    try {
        xml = await $fetch<string>(RSS_URL, {
            headers: { 'User-Agent': USER_AGENT },
            responseType: 'text',
            timeout: 8000,
        });
    } catch {
        throw createError({ statusCode: 502, statusMessage: 'Upstream feed unreachable' });
    }

    const items = parseItems(xml);
    if (items.length === 0) {
        throw createError({ statusCode: 502, statusMessage: 'No items in feed' });
    }

    const matching = items.filter((it) => `${it.naam} ${it.categorie}`.toLowerCase().includes(today));
    const pool = matching.length > 0 ? matching : items;
    const pick = pool[Math.floor(Math.random() * pool.length)];

    const imageRes = await fetch(pick.url, { headers: { 'User-Agent': USER_AGENT } });
    if (!imageRes.ok) {
        throw createError({ statusCode: 502, statusMessage: 'Image fetch failed' });
    }

    const contentType = imageRes.headers.get('content-type') ?? 'image/jpeg';
    const buffer = await imageRes.arrayBuffer();

    setHeader(event, 'Content-Type', contentType);
    setHeader(event, 'Cache-Control', 'public, max-age=300, s-maxage=300');

    return new Uint8Array(buffer);
});
