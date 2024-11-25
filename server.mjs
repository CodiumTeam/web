import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { availableLanguages, compileHtml, i18n } from './build/utils.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
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
      const html = compileHtml(template, {
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
