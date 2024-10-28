import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  root: resolve(__dirname, 'src'),
  publicDir: resolve(__dirname, 'static'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    target: ['chrome90', 'firefox89', 'safari15', 'edge90']
  },
});
