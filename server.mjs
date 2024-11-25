import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import express from 'express';
import {createServer as createViteServer} from 'vite';
import ejs from 'ejs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();
  const vite = await createViteServer({
    server: {middlewareMode: true},
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl === '/' ? '/index.html' : req.originalUrl;
    try {
      let template = fs.readFileSync(
        path.resolve(__dirname, 'src', url.replace('/', '')),
        'utf-8'
      );
      template = await vite.transformIndexHtml(url, ejs.compile(template, {
        views: [path.join(__dirname, 'src')],
        async: false,
      })());

      res.status(200).set({'Content-Type': 'text/html'}).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(3000);
}

createServer();
