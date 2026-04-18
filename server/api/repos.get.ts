interface GithubRepo {
    name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    fork: boolean;
    archived: boolean;
    pushed_at: string;
    topics?: string[];
}

export interface RepoSummary {
    name: string;
    url: string;
    description: string;
    language: string | null;
    stars: number;
    forks: number;
    pushedAt: string;
    topics: string[];
}

export default defineCachedEventHandler(
    async (event): Promise<RepoSummary[]> => {
        const headers: Record<string, string> = {
            'User-Agent': 'ericlandheer.nl/2.0',
            Accept: 'application/vnd.github+json',
        };
        const token = process.env.GITHUB_TOKEN;
        if (token) headers.Authorization = `Bearer ${token}`;

        let repos: GithubRepo[] = [];
        try {
            repos = await $fetch<GithubRepo[]>(
                'https://api.github.com/users/Elandlord/repos?per_page=100&sort=pushed',
                { headers, timeout: 8000 },
            );
        } catch (e) {
            setResponseStatus(event, 200);
            return [];
        }

        return repos
            .filter((r) => !r.fork && !r.archived)
            .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
            .slice(0, 12)
            .map((r) => ({
                name: r.name,
                url: r.html_url,
                description: r.description ?? '',
                language: r.language,
                stars: r.stargazers_count,
                forks: r.forks_count,
                pushedAt: r.pushed_at,
                topics: r.topics ?? [],
            }));
    },
    {
        maxAge: 60 * 30,
        swr: true,
        name: 'github-repos',
    },
);
