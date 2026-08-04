export interface SectionOffset {
    id: string;
    top: number;
}

export function resolveActiveSection(
    offsets: SectionOffset[],
    threshold = 140,
    fallback = 'about'
): string {
    let cur = fallback;
    for (const o of offsets) {
        if (o.top < threshold) cur = o.id;
    }
    return cur;
}
