import {DEFAULT_LANG} from "./i18n-utils.mjs";

export function urlResolver(path, locale = process.env.locale) {
  if (locale && locale !== DEFAULT_LANG) {
    return `/${process.env.locale}${path}`;
  }

  return path;
}