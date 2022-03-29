import { defineConfig } from 'vite';
import nunjucks from 'vite-plugin-nunjucks';
import { resolve } from 'path';

const ROOT = resolve(__dirname, 'src');

const inputs = {
  docker: resolve(ROOT, 'docker', 'index.html'),
  tdd: resolve(ROOT, 'tdd', 'index.html'),
  'working-with-legacy-code': resolve(
    ROOT,
    'working-with-legacy-code',
    'index.html'
  ),
  resource: resolve(ROOT, 'resource', 'index.html'),
};

export default defineConfig({
  root: ROOT,
  build: {
    rollupOptions: {
      input: inputs,
    },
  },
});
