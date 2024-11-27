import { defineConfig, loadEnv } from 'vite';
import path, { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { compileHtml, getHtmlFilesToProcess } from './build/utils.mjs';
import { DEFAULT_LANG, i18n } from './build/i18n-utils.mjs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, 'src');

export default defineConfig(({ mode }) => {
  process.env = {
    ...loadEnv(mode, process.cwd(), ''),
    ...process.env,
    VITE_APP_LANG: process.env.locale || DEFAULT_LANG,
  };

  const isProduction = mode === 'production';

  return {
    css: {
      devSourcemap: true,
    },
    publicDir: resolve(__dirname, 'public'),
    root: SRC,
    envDir: __dirname,
    plugins: [isProduction && parseTranslationTag(), react()],
    build: {
      outDir: getOutDir(),
      emptyOutDir: false,
      rollupOptions: {
        input: getHtmlFilesToProcess(),
      },
    },
  };
});

function parseTranslationTag() {
  i18n.setLocale(process.env.locale || 'es');
  return {
    name: 'transform-html',
    transformIndexHtml: {
      enforce: 'pre',
      transform(html) {
        return compileHtml(html, {
          ...i18n,
        });
      },
    },
  };
}

function getOutDir() {
  const path = resolve(__dirname, 'dist');

  if (process.env.locale === DEFAULT_LANG) {
    return path;
  }

  return resolve(path, process.env.locale || DEFAULT_LANG);
}
