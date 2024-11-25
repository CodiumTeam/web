import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import { compileHtml, getHtmlFilesToProcess } from './build/utils.mjs';
import { i18n } from './build/i18n-utils.mjs';

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
      outDir: resolve(__dirname, 'dist'),
      emptyOutDir: false,
      rollupOptions: {
        input: getHtmlFilesToProcess(),
      },
    },
  };
});

function parseTranslationTag() {
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
