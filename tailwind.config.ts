import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
    content: [
        './components/**/*.{vue,ts}',
        './pages/**/*.vue',
        './app.vue',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui'],
                mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
            },
            colors: {
                bg: '#050814',
                panel: '#0a0f1f',
                ink: {
                    950: '#050814',
                    900: '#0a0f1f',
                    800: '#111733',
                },
                line: 'rgba(148,163,184,0.14)',
                head: '#f1f5f9',
                text: '#cbd5e1',
                dim: '#64748b',
                cyan: { DEFAULT: '#22d3ee' },
                violet: { DEFAULT: '#a78bfa' },
                pink: { DEFAULT: '#f472b6' },
                amber: { DEFAULT: '#fbbf24' },
                lime: { DEFAULT: '#a3e635' },
                accent: { DEFAULT: '#22d3ee', soft: '#67e8f9', deep: '#0891b2' },
            },
            animation: {
                blink: 'blink 1.05s steps(2, end) infinite',
            },
            keyframes: {
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' },
                },
            },
        },
    },
};
