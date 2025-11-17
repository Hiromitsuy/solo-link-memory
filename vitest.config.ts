import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['node_modules', 'client'],
    alias: {
      '@root': path.resolve('./'),
      '@': path.resolve('./src'),
    },
  },
});
