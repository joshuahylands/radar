import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@components', replacement: '/src/components' },
      { find: '@context', replacement: '/src/context' },
      { find: '@map', replacement: '/src/map' },
      { find: '@model', replacement: '/src/model' },
      { find: '@nav', replacement: '/src/nav' },
      { find: '@services', replacement: '/src/services' },
      { find: '@sidebar', replacement: '/src/sidebar' },
      { find: '@styles', replacement: '/src/styles' }
    ]
  }
});
