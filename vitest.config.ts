import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        include: ['{server,components,composables,utils,data}/**/*.test.ts'],
        setupFiles: ['./vitest.setup.ts'],
        coverage: {
            provider: 'v8',
            include: ['server/**', 'components/**', 'composables/**', 'utils/**', 'data/**'],
        },
    },
});
