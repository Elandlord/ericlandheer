const SITE_URL = 'https://ericlandheer.nl';
const LASTMOD = '2026-08-11';

export default defineEventHandler((event) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${SITE_URL}/</loc>
        <lastmod>${LASTMOD}</lastmod>
    </url>
</urlset>
`;

    setHeader(event, 'Content-Type', 'application/xml');

    return xml;
});
