import type { CSSProperties } from 'vue';

import type { Job } from '~/data/site';

export function jobTypeColor(job: Pick<Job, 'type' | 'until'>): string {
    if (!job.until && job.type === 'work') return '#fbbf24';
    if (job.type === 'work') return '#22d3ee';
    if (job.type === 'school') return '#a78bfa';
    return '#f472b6';
}

export function jobDotStyle(job: Pick<Job, 'type' | 'until'>): CSSProperties {
    const col = jobTypeColor(job);
    return {
        marginTop: '20px',
        width: '13px',
        height: '13px',
        borderRadius: '7px',
        background: col,
        boxShadow: (!job.until && job.type === 'work') ? `0 0 0 4px #fbbf2422, 0 0 14px #fbbf24` : `0 0 0 3px #050814`,
        border: `2px solid ${col}`,
        position: 'relative' as const,
    };
}

export function jobPillLabel(type: Job['type']): string {
    if (type === 'school') return 'EDU';
    if (type === 'certification') return 'CERT';
    return 'WORK';
}

export function jobPillStyle(type: Job['type']): CSSProperties {
    const map: Record<Job['type'], string> = {
        work: '#22d3ee',
        school: '#a78bfa',
        certification: '#fbbf24',
    };
    const c = map[type];
    return {
        fontSize: '10px',
        letterSpacing: '1.2px',
        padding: '3px 7px',
        color: c,
        border: `1px solid ${c}55`,
        background: `${c}11`,
    };
}
