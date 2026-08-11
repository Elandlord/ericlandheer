import type { Job } from '~/data/site';

export function yearsShipping(jobs: Job[], now: Date): number {
    const devJobs = jobs.filter((job) => job.type === 'work' && job.title !== 'Kitchen worker');

    const fromKeys = devJobs.map((job) => {
        const [fromYear, fromMonth] = job.from.split('-');
        return Number(fromYear) * 12 + Number(fromMonth);
    });

    const earliestFromKey = Math.min(...fromKeys);
    const nowKey = now.getFullYear() * 12 + (now.getMonth() + 1);

    return Math.max(0, Math.floor((nowKey - earliestFromKey) / 12));
}
