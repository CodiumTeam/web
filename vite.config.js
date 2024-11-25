import { defineConfig, loadEnv } from 'vite';
import { basename, resolve } from 'path';
import ejs from 'vite-plugin-ejs-engine';
import react from '@vitejs/plugin-react';
import glob from 'glob';

export const replaceTransWithSpan = (html) =>
  html.replace(
    /<Trans\b[^>]*>(.*?)<\/Trans>/gs, // Match <Trans>...</Trans> tags
    (match, p1) => `<%= t['${p1}'] %>`
  );

const transformHtmlPlugin = () => ({
  name: 'transform-html',
  transformIndexHtml: {
    enforce: 'pre',
    transform(html) {
      return replaceTransWithSpan(html);
    },
  },
});

const SRC = resolve(__dirname, 'src');

const htmlFiles = glob.sync(`${SRC}/*.html`);
const inputs = htmlFiles.reduce((acc, file) => {
  acc[basename(file)] = file;
  return acc;
}, {});

export default defineConfig(({ mode }) => {
  process.env = {
    ...loadEnv(mode, process.cwd(), ''),
    ...process.env,
  };

  return {
    css: {
      devSourcemap: true,
    },
    publicDir: resolve(__dirname, 'public'),
    root: SRC,
    envDir: __dirname,
    plugins: [ejs(), react(), transformHtmlPlugin()],
    build: {
      outDir: resolve(__dirname, 'dist'),
      emptyOutDir: false,
      rollupOptions: {
        input: inputs,
      },
    },
    server: {
      middlewareMode: true,
    },
  };
});
