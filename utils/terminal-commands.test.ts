import { describe, expect, it } from 'vitest';

import { resolveCommand } from './terminal-commands';

const SECTIONS = [
    { id: 'about' },
    { id: 'skills' },
    { id: 'experience' },
    { id: 'lab' },
    { id: 'projects' },
    { id: 'contact' },
];

describe('resolveCommand', () => {
    it('echoes empty input without acting on it', () => {
        expect(resolveCommand('   ', SECTIONS)).toEqual({ kind: 'echo', message: '' });
    });

    it('resolves clear', () => {
        expect(resolveCommand('clear', SECTIONS)).toEqual({ kind: 'clear', message: 'cleared.' });
    });

    it('resolves help and its ls alias to the same output', () => {
        const help = resolveCommand('help', SECTIONS);

        expect(help).toEqual({
            kind: 'help',
            message: 'sections: about · skills · experience · lab · projects · contact',
        });
        expect(resolveCommand('ls', SECTIONS)).toEqual(help);
    });

    it('resolves whoami', () => {
        expect(resolveCommand('whoami', SECTIONS)).toEqual({
            kind: 'whoami',
            message: 'eric.landheer / full stack engineer / Groningen, NL',
        });
    });

    it('jumps on an exact section match, ignoring case and surrounding space', () => {
        expect(resolveCommand('  Lab ', SECTIONS)).toEqual({
            kind: 'jump',
            targetId: 'lab',
            message: 'jumping to #lab…',
        });
    });

    it('jumps when the command starts with a section id', () => {
        expect(resolveCommand('experience --verbose', SECTIONS)).toEqual({
            kind: 'jump',
            targetId: 'experience',
            message: 'jumping to #experience…',
        });
    });

    it('errors on an unknown command', () => {
        expect(resolveCommand('sudo rm', SECTIONS)).toEqual({
            kind: 'error',
            message: "command not found: sudo rm. try 'help'.",
        });
    });
});
