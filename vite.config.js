import { defineConfig, loadEnv } from 'vite';
import { basename, resolve } from 'path';
import ejs from 'vite-plugin-ejs-engine';
import react from '@vitejs/plugin-react';
import glob from 'glob';
import { replaceTTagByEjsTranslation } from './build-utils.mjs';

const SRC = resolve(__dirname, 'src');

const parseTranslationTag = () => ({
  name: 'transform-html',
  transformIndexHtml: {
    enforce: 'pre',
    transform(html) {
      return replaceTTagByEjsTranslation(html);
    },
  },
});

export default defineConfig(({ mode }) => {
  process.env = {
    ...loadEnv(mode, process.cwd(), ''),
    ...process.env,
  };

  const isProduction = mode === 'production';

  return {
    css: {
      devSourcemap: true,
    },
    publicDir: resolve(__dirname, 'public'),
    root: SRC,
    envDir: __dirname,
    plugins: [isProduction && parseTranslationTag(), ejs(), react()],
    build: {
      outDir: resolve(__dirname, 'dist'),
      emptyOutDir: false,
      rollupOptions: {
        input: getHtmlFilesToProcess(),
      },
    },
  };
});

function getHtmlFilesToProcess() {
  const htmlFiles = glob.sync(`${SRC}/*.html`);
  return htmlFiles.reduce((acc, file) => {
    acc[basename(file)] = file;
    return acc;
  }, {});
}
