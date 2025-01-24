import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve('src/'),
      '@app': resolve('src/app'),
      '@pages': resolve('src/pages'),
      '@widgets': resolve('src/widgets'),
      '@features': resolve('src/features'),
      '@entities': resolve('src/entities'),
      '@shared': resolve('src/shared'),
    },
  },
});
