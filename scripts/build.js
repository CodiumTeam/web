const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const promisify = require('util').promisify;
const writeFileSyncPromise = promisify(fs.writeFileSync);
const renderPromise = promisify(ejs.renderFile);

const ROOT_DIR = path.resolve(__dirname, '..');
const TEMPLATES_PATH = path.resolve(ROOT_DIR, 'templates');

function buildTemplates() {
  const templates = [
    'home.ejs',
    // 'docker.ejs',
    // 'tdd.ejs',
    // 'working-with-legacy-code.ejs',
  ];

  templates.forEach(async (template) => {
    const content = await renderPromise(
      path.resolve(TEMPLATES_PATH, template),
      {}
    );

    const templateOutputFile = path.resolve(
      ROOT_DIR,
      template.replace('.ejs', '.two.html')
    );

    await writeFileSyncPromise(templateOutputFile, content, {
      encoding: 'utf8',
      flag: 'w',
    });
  });
}

buildTemplates();
