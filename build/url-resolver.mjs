import {DEFAULT_LANG} from "./i18n-utils.mjs";

export function urlResolver(path, locale = process.env.locale) {
  const host = process.env.BASE_DOMAIN || "https://www.codium.team";

  if (locale && locale !== DEFAULT_LANG) {
    return `${host}/${locale}${path}`;
  }

  return host + path;
}