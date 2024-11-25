const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

const replaceTransWithSpan = (html) =>
  html.replace(
    /<Trans\b[^>]*>(.*?)<\/Trans>/gs, // Match <Trans>...</Trans> tags
    (match, p1) => `<span data-t="${p1.trim()}">${p1.trim()}</span>` // Replace with <span data-t>
  );

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  input: [
    isDev ? './src/**/*.html' : './dist/**/*.html',
    '!**/node_modules/**',
  ],
  output: './',
  options: {
    debug: false,
    lngs: ['es', 'en'],
    ns: [],
    defaultLng: 'es',
    resource: {
      loadPath: 'src/{{lng}}.json',
      savePath: isDev
        ? 'src/locales/{{lng}}.json'
        : 'dist/locales/{{lng}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    nsSeparator: false, // namespace separator
    keySeparator: false, // key separator
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
    metadata: {},
    allowDynamicKeys: false,
  },
  transform: function customTransform(file, enc, done) {
    'use strict';
    const parser = this.parser;
    const content = fs.readFileSync(file.path, enc);
    const viewsPath = path.join(__dirname, 'src');

    const realConent = isDev
      ? ejs.compile(content, {
          filename: path.basename(file.path),
          views: [viewsPath],
          async: false,
        })()
      : content;
    parser.parseAttrFromString(
      replaceTransWithSpan(realConent),
      { list: ['data-t'] },
      customHandler(parser)
    );

    done();
  },
};

const customHandler = function (parser) {
  return (key) => {
    parser.set(key, key);
  };
};
