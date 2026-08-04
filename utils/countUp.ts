export function computeCountUpValue(elapsedMs: number, durationMs: number, to: number): number {
    if (durationMs <= 0) return to;

    const p = Math.min(1, elapsedMs / durationMs);
    const eased = 1 - Math.pow(1 - p, 3);

    return Math.round(to * eased);
}
