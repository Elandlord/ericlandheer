export type TerminalCommandKind = 'clear' | 'help' | 'whoami' | 'jump' | 'echo' | 'error';

export interface TerminalCommand {
    kind: TerminalCommandKind;
    targetId?: string;
    message: string;
}

const HELP_MESSAGE = 'sections: about · skills · experience · lab · projects · contact';
const WHOAMI_MESSAGE = 'eric.landheer / full stack engineer / Groningen, NL';

export function resolveCommand(raw: string, sections: { id: string }[]): TerminalCommand {
    const cmd = raw.trim().toLowerCase();

    if (!cmd) return { kind: 'echo', message: '' };
    if (cmd === 'clear') return { kind: 'clear', message: 'cleared.' };
    if (cmd === 'help' || cmd === 'ls') return { kind: 'help', message: HELP_MESSAGE };
    if (cmd === 'whoami') return { kind: 'whoami', message: WHOAMI_MESSAGE };

    const target = sections.find((s) => s.id === cmd || cmd.startsWith(s.id));
    if (target) return { kind: 'jump', targetId: target.id, message: `jumping to #${target.id}…` };

    return { kind: 'error', message: `command not found: ${cmd}. try 'help'.` };
}
