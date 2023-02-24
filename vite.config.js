import { defineConfig } from 'vite';
import { resolve } from 'path';
import ejs from 'vite-plugin-ejs-engine';
import react from '@vitejs/plugin-react';

const SRC = resolve(__dirname, 'src');
const inputs = {
  main: pathFor('index.html'),
  'curso-docker.html': pathFor('curso-docker.html'),
  'curso-tdd.html': pathFor('curso-tdd.html'),
  'curso-legacy-code.html': pathFor('curso-legacy-code.html'),
  'curso-refactoring-a-patrones': pathFor('curso-refactoring-a-patrones.html'),
  'curso-testing-qa': pathFor('curso-testing-qa.html'),
  'accelerate-program': pathFor('programa-de-aceleracion.html'),
  development: pathFor('desarrollo.html'),
  services: pathFor('servicios.html'),
  404: pathFor('404.html'),
  'tdd-challenge': pathFor('tdd-challenge.html'),
  resource: pathFor('resources.html'),
  'style-guide': pathFor('style-guide.html'),
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
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: false,
    rollupOptions: {
      input: inputs,
    },
  },
});

function pathFor(file) {
  return resolve(SRC, file);
}
