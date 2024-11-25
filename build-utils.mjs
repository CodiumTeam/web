export const replaceTTagByEjsTranslation = (html) =>
  html.replace(
    /<t\b[^>]*>(.*?)<\/t>/gs, // Match <Trans>...</Trans> tags
    (match, p1) => `<%= __('${p1.trim()}') %>`
  );