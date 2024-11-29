import { DEFAULT_LANG } from './i18n-utils.mjs';
import { translateUrlInProduction } from './url-translated.mjs';

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
