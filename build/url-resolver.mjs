import { DEFAULT_LANG } from './i18n-utils.mjs';
export const keyTranslations = {
  '/curso-docker.html': '/docker-training.html',
  '/curso-legacy-code.html': '/legacy-code-training.html',
  '/curso-quality-assurance.html': '/quality-assurance-training.html',
  '/curso-refactoring-a-patrones.html': '/refactoring-patterns-training.html',
  '/curso-tdd.html': '/tdd-training.html',
  '/desarrollo.html': '/development.html',
  '/programa-de-aceleracion.html': '/acceleration-program.html',
};

export function urlResolver(path, locale = process.env.locale) {
  const host = process.env.BASE_DOMAIN || 'https://www.codium.team';

  if (path.startsWith('http')) {
    if (locale !== DEFAULT_LANG) {
      return path + '/' + locale;
    }

    return translateUrlInProduction(path);
  }

  if (locale && locale !== DEFAULT_LANG) {
    return `${host}/${locale}${translateUrlInProduction(path)}`;
  }

  return host + path;
}

function translateUrlInProduction(path) {
  if (process.env.NODE_ENV !== 'production') return path;

  return keyTranslations[path] || path; // Return the translated path or the original if not found
}
