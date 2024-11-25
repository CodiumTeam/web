import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import express from 'express';
import {createServer as createViteServer} from 'vite';
import ejs from 'ejs';
import {I18n} from 'i18n';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const languagesDir = path.join(__dirname, 'src', 'locales');
const availableLanguages = fs
  .readdirSync(languagesDir)
  .filter((file) => file.endsWith('.json'))
  .map((file) => path.basename(file, '.json'));

export const replaceTransWithSpan = (html) =>
  html.replace(
    /<t\b[^>]*>(.*?)<\/t>/gs, // Match <Trans>...</Trans> tags
    (match, p1) => `<%= __('${p1.trim()}') %>`
  );

async function createServer() {
  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  const i18n = new I18n({
    locales: availableLanguages,
    directory: languagesDir,
    register: global,
  });

  app.use(vite.middlewares);
  app.use(i18n.init);
  app.use('*', async (req, res, next) => {
    req.setLocale(getLocaleFromReq(req));
    const url = getFixedUrl(req);

    if (!url.endsWith('.html')) {
      return res.redirect(removeLanguagesFromUrl(req.originalUrl));
    }

    try {
      let template = fs.readFileSync(
        path.resolve(__dirname, 'src', url),
        'utf-8'
      );
      const html = ejs.compile(replaceTransWithSpan(template), {
        views: [path.join(__dirname, 'src')],
        async: false,
      })({
        ...res.locals,
      });

      res
        .status(200)
        .set({ 'Content-Type': 'text/html' })
        .end(await vite.transformIndexHtml(url, html));
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  const url = new URL(process.env.BASE_DOMAIN);
  app.listen(url.port);
}

createServer().then(() => {
  console.log('App is running on: ', process.env.BASE_DOMAIN);
});

function getLocaleFromReq(req) {
  let locale = 'es';
  const parts = req.originalUrl.split('/');
  if (availableLanguages.includes(parts[1])) {
    locale = parts[1];
  }
  return locale;
}

function getFixedUrl(req) {
  let url = removeLanguagesFromUrl(req.originalUrl).replace('/', '');

  if (!url) {
    url = 'index.html';
  }

  return url;
}

function removeLanguagesFromUrl(originalUrl) {
  return originalUrl.replace(
    new RegExp(`^/(${availableLanguages.join('|')})/`),
    '/'
  );
}
