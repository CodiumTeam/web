import { defineConfig } from 'vite';
import nunjucks from 'vite-plugin-nunjucks';
import fs from 'fs';
import { resolve } from 'path';

const ROOT = resolve(__dirname);
const pages = fs.readdirSync(resolve(ROOT, 'pages'));

const inputs = {};

pages.forEach((page) => {
  inputs[page] = resolve(ROOT, 'pages', page);
});

export default defineConfig({
  plugins: [nunjucks()],
  build: {
    rollupOptions: {
      input: inputs,
    },
  },
});
