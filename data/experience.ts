export interface ExperienceItem {
    title: string;
    company: string;
    city: string;
    image: string | null;
    from: string;
    until: string | null;
    description: string;
    type: 'work' | 'school' | 'certification';
    upcoming?: boolean;
    url?: string;
}

export const jobs: ExperienceItem[] = [
    {
        title: 'Senior Engineer',
        company: 'Simplicate',
        city: 'Groningen',
        image: '/assets/images/simplicate.svg',
        from: '2026-06-01',
        until: null,
        description:
            'Joining the Simplicate engineering team in June 2026 to help build their business software platform for professional services.',
        type: 'work',
        upcoming: true,
    },
    {
        title: 'Developer · Scrum Master',
        company: 'PeterPrint',
        city: 'Groningen',
        image: '/assets/images/peterprint.svg',
        from: '2022-01-01',
        until: '2026-05-31',
        description:
            'Worked on the Magento 2 webshop and a growing fleet of Symfony microservices, Nuxt storefronts and event-driven integrations. Scalable architecture, NATS messaging, and developer workflows. Also served as Scrum Master for the team, making sure Scrum practices were followed. Main back-end code reviewer.',
        type: 'work',
    },
    {
        title: 'Founder · Full stack developer',
        company: 'MEN Technology & Media',
        city: 'Groningen',
        image: '/assets/images/men.png',
        from: '2014-01-01',
        until: '2021-12-31',
        description:
            'My own company. Designed, built and shipped Laravel + Vue web applications for a wide range of clients. Ran everything end to end: discovery, architecture, delivery, hosting and client relationships.',
        type: 'work',
    },
    {
        title: 'Back-end developer',
        company: 'Qlic Internet Solutions B.V.',
        city: 'Groningen',
        image: '/assets/images/qlic.png',
        from: '2021-11-01',
        until: '2021-11-30',
        description: 'Short stint writing PHP back-end code. Good people, not the right fit for me at the time.',
        type: 'work',
    },
    {
        title: 'Junior developer',
        company: 'RAPIDE Internet',
        city: 'Groningen',
        image: '/assets/images/rapide.svg',
        from: '2017-10-01',
        until: '2018-09-01',
        description: 'First professional steps in web development: PHP, JavaScript, and a lot of learning on the job.',
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
    {
        title: 'Senior Laravel Developer Exam',
        company: 'Laravel LLC',
        city: 'Arkansas City',
        image: '/assets/images/laravel.png',
        from: '2021-11-01',
        until: '2021-11-30',
        description: 'Official Senior Laravel Developer certification issued by Laravel LLC.',
        type: 'certification',
        url: 'https://verifier.certificationforlaravel.org/66cb0c49-e756-4aaa-a92a-01a7c66bd4c4',
    },
    {
        title: 'Agile Scrum Master Training',
        company: 'Agile Scrum Group',
        city: 'Remote',
        image: '/assets/images/agile-scrum-group.png',
        from: '2025-05-01',
        until: '2025-05-31',
        description: 'Scrum Master training covering sprint facilitation, backlog refinement, and team coaching.',
        type: 'certification',
        url: 'https://agilescrumgroup.nl/scrum-master/',
    },
    {
        title: 'Anglia English (Level C1)',
        company: 'Anglia & Optima',
        city: 'Groningen',
        image: null,
        from: '2009-05-01',
        until: '2009-05-31',
        description: 'Anglia English Proficiency Level C1 certification.',
        type: 'certification',
    },
];

export function formatPeriod(from: string, until: string | null): string {
    const opts: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' };
    const start = new Date(from).toLocaleDateString('en-GB', opts);
    const end = until ? new Date(until).toLocaleDateString('en-GB', opts) : 'now';
    return `${start} → ${end}`;
}
