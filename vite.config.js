import { defineConfig } from 'vite';
import { resolve } from 'path';
import copy from 'rollup-plugin-copy';
import ejs from 'vite-plugin-ejs-engine';

const ROOT = resolve(__dirname, 'src');
const DIST = resolve(__dirname, 'dist');

const inputs = {
  main: resolve(ROOT, 'index.html'),
  'curso-docker.html': resolve(ROOT, 'curso-docker.html'),
  'curso-tdd.html': resolve(ROOT, 'curso-tdd.html'),
  'curso-legacy-code.html': resolve(ROOT, 'curso-legacy-code.html'),
  resource: resolve(ROOT, 'resources.html'),
  'style-guide': resolve(ROOT, 'style-guide.html'),
};

export default defineConfig({
  root: ROOT,
  plugins: [
    ejs(),
    copy({
      targets: [
        {
          src: resolve(ROOT, 'fonts'),
          dest: resolve(DIST, 'assets'),
        },
        {
          src: resolve(ROOT, 'img', 'codium*.*'),
          dest: resolve(DIST, 'img'),
        },
        {
          src: resolve(__dirname, 'php'),
          dest: resolve(DIST),
        },
        {
          src: resolve(ROOT, '.htaccess'),
          dest: resolve(DIST),
        },
        {
          src: resolve(ROOT, 'vendor'),
          dest: resolve(DIST, 'vendor'),
        },
      ],
    }),
  ],
  build: {
    outDir: DIST,
    rollupOptions: {
      input: inputs,
    },
  },
});
