import {I18n} from 'i18n';
import path from 'node:path';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import ejs from 'ejs';
import glob from "glob";
import {basename} from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SRC = path.resolve(__dirname, '..', 'src');
export const languagesDir = path.resolve(SRC, 'locales');

export const getHtmlFilesToProcess = () => {
  const htmlFiles = glob.sync(`${SRC}/*.html`);
  return htmlFiles.reduce((acc, file) => {
    acc[basename(file)] = file;
    return acc;
  }, {});
};

export const availableLanguages = fs
  .readdirSync(languagesDir)
  .filter((file) => file.endsWith('.json'))
  .map((file) => path.basename(file, '.json'));

export const i18n = new I18n({
  locales: availableLanguages,
  directory: languagesDir,
  register: global,
});

export const compileHtml = (html, ejsData = {}, extractor = () => undefined) => {
  const compiledHtml = html.replace(
    /<t\b[^>]*>(.*?)<\/t>/gs, // Match <Trans>...</Trans> tags
    (match, p1) => {
      extractor(p1);
      return `<%= __('${p1.trim()}') %>`;
    }
  );

  return ejs.compile(compiledHtml, {
    views: [SRC],
    async: false,
  })({
    ...ejsData
  });
};