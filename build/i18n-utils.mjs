import path from 'node:path';
import {fileURLToPath} from 'node:url';
import fs from 'node:fs';
import {I18n} from 'i18n';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, '..', 'src');

export const languagesDir = path.resolve(SRC, 'locales');
export const DEFAULT_LANG = 'es';
export const availableLanguages = fs
  .readdirSync(languagesDir)
  .filter((file) => file.endsWith('.json'))
  .map((file) => path.basename(file, '.json'));


export const i18n = new I18n({
  locales: availableLanguages,
  directory: languagesDir,
  retryInDefaultLocale: false,
  updateFiles: false,
  syncFiles: false,
  autoReload: process.env.NODE_ENV === 'development',
});
