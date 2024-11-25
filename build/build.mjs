import { execSync } from 'node:child_process';
import { i18n } from './i18n-utils.mjs';

function runBuild(locale) {
  console.log('Building for location: ' + locale)
  process.env.NODE_ENV = 'production';
  process.env.locale = locale;
  execSync('vite build --mode=production', { stdio: 'inherit' });
}

const locales = i18n.getLocales();

for (const locale of locales) {
  runBuild(locale);
}
