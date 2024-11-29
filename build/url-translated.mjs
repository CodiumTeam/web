export const keyTranslations = {
  'curso-docker.html': 'docker-training.html',
  'curso-legacy-code.html': 'legacy-code-training.html',
  'curso-quality-assurance.html': 'quality-assurance-training.html',
  'curso-refactoring-a-patrones.html': 'refactoring-patterns-training.html',
  'curso-tdd.html': 'tdd-training.html',
  'desarrollo.html': 'development.html',
  'programa-de-aceleracion.html': 'acceleration-program.html',
};

export function translateUrlInProduction(path, locale) {
  if (process.env.NODE_ENV !== 'production') return path;

  if (path.startsWith('/')) {
    path = path.replace('/', '');
  }

  if (locale === 'es') {
    // Find the key corresponding to the given path value
    const originalKey = Object.keys(keyTranslations).find(
      (key) => keyTranslations[key] === path
    );
    return originalKey ? `/${originalKey}` : `/${path}`;
  }

  const newUrl = keyTranslations[path] || path;
  return `/${newUrl}`;
}
