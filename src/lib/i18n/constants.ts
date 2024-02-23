export const DICTIONARIES = {
  'en-gb': () =>
    import('./dictionaries/en-gb.json').then((module) => module.default),
  'fr-fr': () =>
    import('./dictionaries/fr-fr.json').then((module) => module.default),
};
