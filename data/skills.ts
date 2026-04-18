export interface Skill {
    name: string;
    blurb: string;
    icon: string;
    accent: string;
}

export const skills: Skill[] = [
    {
        name: 'Laravel & Symfony',
        blurb: 'Production APIs, robust domain logic, and maintainable service architecture.',
        icon: 'logos:laravel',
        accent: 'from-red-500/20 to-orange-500/10',
    },
    {
        name: 'Vue & Nuxt',
        blurb: 'Interactive interfaces with clear state management and component-driven structure.',
        icon: 'logos:nuxt-icon',
        accent: 'from-emerald-400/20 to-teal-400/10',
    },
    {
        name: 'Tailwind CSS',
        blurb: 'Fast UI iteration with consistent spacing, hierarchy, and responsive behavior.',
        icon: 'logos:tailwindcss-icon',
        accent: 'from-sky-400/20 to-cyan-400/10',
    },
    {
        name: 'Docker & Kubernetes',
        blurb: 'Predictable local and CI environments across services and platforms.',
        icon: 'logos:docker-icon',
        accent: 'from-blue-400/20 to-indigo-400/10',
    },
    {
        name: 'Go',
        blurb: 'Lightweight services and tooling where simplicity and performance matter.',
        icon: 'logos:go',
        accent: 'from-cyan-400/20 to-sky-400/10',
    },
    {
        name: 'Event-driven systems',
        blurb: 'NATS, Kafka, RabbitMQ — designing reliable async workflows between services.',
        icon: 'ph:lightning-bold',
        accent: 'from-violet-400/20 to-fuchsia-400/10',
    },
];

export interface Project {
    name: string;
    description: string;
    url: string;
    tags: string[];
}

export const projects: Project[] = [
    {
        name: 'local-brain',
        description: 'Self-hosted vector search + RAG over my Zettelkasten vault. Fastify, Ollama, sql.js.',
        url: 'https://github.com/Elandlord',
        tags: ['TypeScript', 'Ollama', 'RAG'],
    },
    {
        name: 'claude-runner',
        description: 'Lightweight task runner that polls a central dashboard API and executes jobs.',
        url: 'https://github.com/Elandlord',
        tags: ['TypeScript', 'Automation'],
    },
    {
        name: 'PeterPrint platform',
        description: 'Magento 2 + microservices powering one of the largest online print shops in NL.',
        url: 'https://www.peterprint.nl',
        tags: ['Magento', 'Symfony', 'Nuxt', 'NATS'],
    },
];
