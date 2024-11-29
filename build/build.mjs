import { execSync } from 'node:child_process';
import {DEFAULT_LANG, i18n} from './i18n-utils.mjs';
import path from "node:path";
import fs from "node:fs";

import {fileURLToPath} from "node:url";
import {keyTranslations} from "./url-translated.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function runBuild(locale) {
  console.log('Building for location: ' + locale)
  process.env.NODE_ENV = 'production';
  process.env.locale = locale;
  execSync('vite build --mode=production', { stdio: 'inherit' });
}


function renameFilesToMatchUrls(directory) {
  for (const [originalName, translatedName] of Object.entries(keyTranslations)) {
    const originalPath = path.join(directory, originalName);
    const translatedPath = path.join(directory, translatedName);

    if (fs.existsSync(originalPath)) {
        fs.renameSync(originalPath, translatedPath);
    } else {
      throw Error(`File not found: ${originalName}`)
    }
  }
}

const locales = i18n.getLocales();
for (const locale of locales) {
  runBuild(locale);
  if (locale !== DEFAULT_LANG) {
    renameFilesToMatchUrls(path.resolve(__dirname, '..', 'dist', locale));
  }
}
