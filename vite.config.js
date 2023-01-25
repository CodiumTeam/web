import { defineConfig } from 'vite';
import { resolve } from 'path';
import ejs from 'vite-plugin-ejs-engine';
import react from '@vitejs/plugin-react';

const SRC = resolve(__dirname, 'src');
const DIST = resolve(__dirname, 'dist');

const inputs = {
  main: resolve(SRC, 'index.html'),
  'curso-docker.html': resolve(SRC, 'curso-docker.html'),
  'curso-tdd.html': resolve(SRC, 'curso-tdd.html'),
  'curso-legacy-code.html': resolve(SRC, 'curso-legacy-code.html'),
  resource: resolve(SRC, 'resources.html'),
  'style-guide': resolve(SRC, 'style-guide.html'),
  'accelerate-program': resolve(SRC, 'programa-de-aceleracion.html'),
  development: resolve(SRC, 'desarrollo.html'),
  404: resolve(SRC, '404.html'),
  'tdd-challenge': resolve(SRC, 'tdd-challenge.html'),
  services: resolve(SRC, 'servicios.html'),
  'curso-refactoring-a-patrones': resolve(
    SRC,
    'curso-refactoring-a-patrones.html'
  ),
  'curso-testing-qa': resolve(SRC, 'curso-testing-qa.html'),
};

export default defineConfig({
  css: {
    devSourcemap: true,
  },
  publicDir: resolve(__dirname, 'public'),
  root: SRC,
  envDir: __dirname,
  plugins: [ejs(), react()],
  build: {
    outDir: DIST,
    emptyOutDir: false,
    rollupOptions: {
      input: inputs,
    },
  },
});
