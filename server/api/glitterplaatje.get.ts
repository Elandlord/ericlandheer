const RSS_URL = 'https://www.deelplaatjes.nl/webmasters/rss?i=dagen-vd-week';
const DAYS_NL = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];

interface Plaatje {
    naam: string;
    plaatje_groot_url: string;
    plaatje_klein_url?: string;
    categorie?: string;
}

function parseItems(xml: string): Plaatje[] {
    const items: Plaatje[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const fieldRegex = (tag: string) => new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`);

    let match: RegExpExecArray | null;
    while ((match = itemRegex.exec(xml)) !== null) {
        const block = match[1];
        const get = (tag: string) => {
            const m = block.match(fieldRegex(tag));
            return m ? m[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim() : '';
        };

        const naam = get('naam');
        const url = get('plaatje_groot_url') || get('plaatje_klein_url');
        if (!url) continue;

        items.push({
            naam,
            plaatje_groot_url: url,
            plaatje_klein_url: get('plaatje_klein_url'),
            categorie: get('categorie'),
        });
    }
    return items;
}

export default defineEventHandler(async (event) => {
    const today = DAYS_NL[new Date().getDay()];

    let xml: string;
    try {
        xml = await $fetch<string>(RSS_URL, {
            headers: { 'User-Agent': 'ericlandheer.nl/2.0 (+https://ericlandheer.nl)' },
            responseType: 'text',
            timeout: 8000,
        });
    } catch (e) {
        throw createError({ statusCode: 502, statusMessage: 'Upstream feed unreachable' });
    }

    const items = parseItems(xml);
    if (items.length === 0) {
        throw createError({ statusCode: 502, statusMessage: 'No items in feed' });
    }

    const matching = items.filter((item) => {
        const haystack = `${item.naam} ${item.categorie ?? ''}`.toLowerCase();
        return haystack.includes(today);
    });

    const pool = matching.length > 0 ? matching : items;
    const pick = pool[Math.floor(Math.random() * pool.length)];

    setHeader(event, 'Cache-Control', 'public, max-age=300, s-maxage=300');

    return {
        image: pick.plaatje_groot_url,
        title: pick.naam || null,
        day: today,
        matched: matching.length > 0,
    };
});
