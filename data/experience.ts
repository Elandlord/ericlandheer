export interface ExperienceItem {
    title: string;
    company: string;
    city: string;
    image: string;
    from: string;
    until: string | null;
    description: string;
    type: 'work' | 'school';
}

export const jobs: ExperienceItem[] = [
    {
        title: 'Lead developer',
        company: 'PeterPrint',
        city: 'Groningen',
        image: '/assets/images/peterprint.png',
        from: '2022-01-01',
        until: null,
        description:
            'Leading the platform team on a Magento 2 webshop plus a growing fleet of Symfony microservices, Nuxt storefronts and event-driven integrations. Focus on scalable architecture, NATS messaging, and robust developer workflows.',
        type: 'work',
    },
    {
        title: 'Full stack developer',
        company: 'MEN Technology & Media',
        city: 'Groningen',
        image: '/assets/images/men.png',
        from: '2014-01-01',
        until: '2021-12-31',
        description:
            'Built and shipped Laravel + Vue applications for a wide range of clients. Grew from junior into a senior role leading technical delivery and mentoring.',
        type: 'work',
    },
    {
        title: 'Junior developer',
        company: 'RAPIDE Internet',
        city: 'Groningen',
        image: '/assets/images/rapide.png',
        from: '2017-10-01',
        until: '2018-09-01',
        description: 'First professional steps in web development — PHP, JavaScript, and a lot of learning on the job.',
        type: 'work',
    },
    {
        title: 'Kitchen worker',
        company: 'Bilderberg Landgoed Lauswolt',
        city: 'Beetsterzwaag',
        image: '/assets/images/bilderberg.jpeg',
        from: '2010-10-01',
        until: '2012-10-01',
        description: 'Before code there was mise en place. Taught me pace, precision, and grace under pressure.',
        type: 'work',
    },
];

export const education: ExperienceItem[] = [
    {
        title: 'HBO-ICT (Bachelor)',
        company: 'Hanzehogeschool Groningen',
        city: 'Groningen',
        image: '/assets/images/hanze.png',
        from: '2012-09-01',
        until: '2020-02-01',
        description: 'Bachelor in ICT, with a focus on software engineering.',
        type: 'school',
    },
];

export function formatPeriod(from: string, until: string | null): string {
    const opts: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' };
    const start = new Date(from).toLocaleDateString('en-GB', opts);
    const end = until ? new Date(until).toLocaleDateString('en-GB', opts) : 'now';
    return `${start} — ${end}`;
}
