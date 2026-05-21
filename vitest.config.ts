import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['**/*.test.{ts,tsx}'], // Шукаємо лише модульні тести поруч із компонентами
    exclude: ['**/node_modules/**', '**/tests/**', '**/*.spec.ts'],
  },
});
