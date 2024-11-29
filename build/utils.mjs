import path, { basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import ejs from 'ejs';
import glob from 'glob';
import { JSDOM } from 'jsdom';
import { decode } from 'html-entities';
import { urlResolver } from './url-resolver.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SRC = path.resolve(__dirname, '..', 'src');

export const getHtmlFilesToProcess = () => {
  const htmlFiles = glob.sync(`${SRC}/*.html`);
  return htmlFiles.reduce((acc, file) => {
    acc[basename(file)] = file;
    return acc;
  }, {});
};

export const compileHtml = (html, ejsData = {}) => {
  function replaceHtml(html) {
    const dom = new JSDOM(html);
    const transElements =
      dom.window.document.documentElement.querySelectorAll('t');
    transElements.forEach((transElement) => {
      const content = transElement.innerHTML.trim().replace(/\s+/g, ' ');
      transElement.outerHTML = `<span><%- __(\`${content}\`) %></span>`;
    });

    return dom.window.document.documentElement.outerHTML;
  }

  function compile(toCompileHTML) {
    return ejs.compile(toCompileHTML, {
      views: [SRC],
      async: false,
    })({
      url: (path, lang) => {
        return urlResolver(path, lang || ejsData.locale || process.env.locale);
      },
      ...ejsData,
    });
  }

  const result = compile(html);
  // now the partials was inline it, we need to re-compile it
  return compile(decode(replaceHtml(result)));
};
