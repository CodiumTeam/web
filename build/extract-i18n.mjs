import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileHtml, getHtmlFilesToProcess } from './utils.mjs';
import fs from 'node:fs';
import { DEFAULT_LANG, i18n, languagesDir } from './i18n-utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlFiles = getHtmlFilesToProcess();
const defaultTranslations = {};

main();

function main() {
  for (const fileName in htmlFiles) {
    const template = fs.readFileSync(
      path.resolve(__dirname, 'src', htmlFiles[fileName]),
      'utf-8'
    );
    compileHtml(template, {
      ...i18n,
      __: keysExtractorDecorator(i18n.__),
    });
  }

  saveInFile(`es.json`, defaultTranslations);

  const languages = i18n.getLocales();
  for (const language of languages) {
    if (language !== DEFAULT_LANG) {
      updateJsonForLanguage(language);
    }
  }
}

function keysExtractorDecorator(i18n__) {
  return (text) => {
    defaultTranslations[text] = text;
    return i18n__(text);
  };
}

function updateJsonForLanguage(language) {
  const langFile = `${language}.json`;
  const oldTranslations = readFile(langFile);
  saveInFile(
    langFile,
    mergeLanguages(oldTranslations, defaultTranslations)
  );
}

function saveInFile(inFile, translations) {
  fs.writeFileSync(
    path.join(languagesDir, inFile),
    JSON.stringify(translations, null, 2) + '\n',
    {
      encoding: 'utf-8',
    }
  );
}

function readFile(file) {
  return JSON.parse(
    fs.readFileSync(path.join(languagesDir, file), { encoding: 'utf-8' })
  );
}

function mergeLanguages(baseLanguages, newLanguages) {
  // Step 1: Add or update keys from newLanguages
  for (const key in newLanguages) {
    baseLanguages[key] = baseLanguages[key] || '__NEED_TRANSLATIONS__';
  }

  // Step 2: Remove keys that are no longer in newLanguages
  for (const key in baseLanguages) {
    if (!(key in newLanguages)) {
      delete baseLanguages[key];
    }
  }

  return baseLanguages;
}
