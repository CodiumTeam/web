import { defineConfig } from 'vite';
import { resolve } from 'path';
import ejs from 'vite-plugin-ejs-engine';

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
};

export default defineConfig({
  css: {
    devSourcemap: true,
  },
  publicDir: resolve(__dirname, 'public'),
  root: SRC,
  envDir: __dirname,
  plugins: [ejs()],
  build: {
    outDir: DIST,
    emptyOutDir: false,
    rollupOptions: {
      input: inputs,
    },
  },
});
