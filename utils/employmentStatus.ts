import type { Job } from '~/data/site';

export interface CurrentRoleStatus {
    verb: 'starting' | 'joined';
    label: string;
}

export function describeCurrentRole(job: Pick<Job, 'from' | 'company'>, now: Date): CurrentRoleStatus {
    const [fromYear, fromMonth] = job.from.split('-');
    const fromKey = Number(fromYear) * 12 + Number(fromMonth);
    const nowKey = now.getFullYear() * 12 + (now.getMonth() + 1);

    const label = new Date(job.from + '-01').toLocaleDateString('en-GB', {
        month: 'short',
        year: 'numeric',
    });

    return {
        verb: fromKey > nowKey ? 'starting' : 'joined',
        label,
    };
}
