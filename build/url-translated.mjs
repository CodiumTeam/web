export const keyTranslations = {
  'curso-docker.html': 'docker-training.html',
  'curso-legacy-code.html': 'legacy-code-training.html',
  'curso-quality-assurance.html': 'quality-assurance-training.html',
  'curso-refactoring-a-patrones.html': 'refactoring-patterns-training.html',
  'curso-tdd.html': 'tdd-training.html',
  'desarrollo.html': 'development.html',
  'programa-de-aceleracion.html': 'acceleration-program.html',
};

export function translateUrlInProduction(path) {
  if (process.env.NODE_ENV !== 'production') return path;

  return keyTranslations[path] || path; // Return the translated path or the original if not found
}
