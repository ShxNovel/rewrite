/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

import { resolve } from 'path';

export default defineConfig({
    test: {
        root: 'test',
        clearMocks: true,
        typecheck: {
            enabled: true,
        },
    },
    build: {
        lib: {
            entry: './src/index.ts',
            name: 'rewrite',
            fileName: 'rewrite',
        },
    },
    resolve: {
        alias: {
            '@/': resolve(__dirname, 'src'),
        },
    },
});
