export function buildQuickChips(sections: { id: string }[]): string[] {
    return [...sections.map((s) => s.id), 'help'];
}
