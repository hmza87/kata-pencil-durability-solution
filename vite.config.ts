// @ts-ignore
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        // Enable "globals" to allow using `describe`, `it`, `expect` without importing them
        globals: true,
    },
});