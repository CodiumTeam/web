import { defineConfig } from 'vite';
import { resolve } from 'path';

const ROOT = resolve(__dirname, 'src');
const DIST = resolve(__dirname);

const inputs = {
  main: resolve(ROOT, 'index.html'),
  'curso-docker.html': resolve(ROOT, 'curso-docker.html'),
  'curso-tdd.html': resolve(ROOT, 'curso-tdd.html'),
  'curso-legacy-code.html': resolve(ROOT, 'curso-legacy-code.html'),
  // resource: resolve(ROOT, 'resource', 'index.html'),
};

export default defineConfig({
  root: ROOT,
  build: {
    outDir: DIST,
    emptyOutDir: false,
    rollupOptions: {
      input: inputs,
    },
  },
});
