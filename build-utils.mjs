import {I18n} from 'i18n';
import path from 'node:path';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import ejs from 'ejs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const languagesDir = path.join(__dirname, 'src', 'locales');

export const availableLanguages = fs
  .readdirSync(languagesDir)
  .filter((file) => file.endsWith('.json'))
  .map((file) => path.basename(file, '.json'));

export const i18n = new I18n({
  locales: availableLanguages,
  directory: languagesDir,
  register: global,
});


export const compileHtml = (html, ejsData = {}) => {
  const compiledHtml = html.replace(
    /<t\b[^>]*>(.*?)<\/t>/gs, // Match <Trans>...</Trans> tags
    (match, p1) => `<%= __('${p1.trim()}') %>`
  );

  return ejs.compile(compiledHtml, {
    views: [path.join(__dirname, 'src')],
    async: false,
  })({
    ...ejsData
  });
};