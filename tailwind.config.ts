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
                sans: ['"Inter Variable"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                display: ['"Space Grotesk Variable"', 'ui-sans-serif', 'system-ui'],
                mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
            },
            colors: {
                ink: {
                    950: '#050814',
                    900: '#0a0f1f',
                    800: '#111733',
                },
                accent: {
                    DEFAULT: '#22d3ee',
                    soft: '#67e8f9',
                    deep: '#0891b2',
                },
            },
            animation: {
                'gradient-shift': 'gradient-shift 14s ease infinite',
                'float': 'float 6s ease-in-out infinite',
                'shimmer': 'shimmer 2.5s linear infinite',
                'blink': 'blink 1.1s steps(2, end) infinite',
            },
            keyframes: {
                'gradient-shift': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
                'shimmer': {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                'blink': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' },
                },
            },
        },
    },
};
