import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { compileHtml, getHtmlFilesToProcess } from './build/utils.mjs';
import { DEFAULT_LANG, i18n } from './build/i18n-utils.mjs';

const SRC = resolve(__dirname, 'src');

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
  i18n.setLocale(process.env.locale);
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
  return resolve(
    __dirname,
    'dist',
    process.env.locale === DEFAULT_LANG ? '' : process.env.locale
  );
}
