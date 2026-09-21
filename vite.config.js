import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  css: {
    url: false,
  },
  build: {
    outDir: 'dist',
    cssMinify: false,
    rollupOptions: {
      input: {
        index: 'src/index.scss',
        pets: 'src/pets.scss',
      },
      output: {
        assetFileNames: '[name][extname]',
      },
    }
  }
});
