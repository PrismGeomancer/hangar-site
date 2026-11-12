import { defineConfig } from 'vite';
export default defineConfig({
  base: './',
  server: { host: '127.0.0.1', port: 5190, strictPort: true },
  preview: { host: '127.0.0.1', port: 5191 },
  build: { target: 'es2022', assetsInlineLimit: 0, chunkSizeWarningLimit: 4000 },
});
