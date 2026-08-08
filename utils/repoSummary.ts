import type { Package } from '~/data/site';

export function describeRepoSummary(packages: Pick<Package, 'lang'>[]): string {
    const count = packages.length;
    const noun = count === 1 ? 'repo' : 'repos';

    if (count === 0) {
        return `${count} ${noun}`;
    }

    const languages = new Set(packages.map((p) => p.lang));
    const lang = languages.size === 1 ? [...languages][0] : 'mixed';

    return `${count} ${noun} · ${lang}`;
}
