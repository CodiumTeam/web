import path from 'node:path';
import {fileURLToPath} from 'node:url';
import ejs from 'ejs';
import glob from "glob";
import {basename} from "path";

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
  const compiledHtml = html.replace(
    /<t\b[^>]*>(.*?)<\/t>/gs, // Match <Trans>...</Trans> tags
    (match, p1) => {
      return `<%= __('${p1.trim()}') %>`;
    }
  );

  return ejs.compile(compiledHtml, {
    views: [SRC],
    async: false,
  })({
    ...ejsData,
  });
};
