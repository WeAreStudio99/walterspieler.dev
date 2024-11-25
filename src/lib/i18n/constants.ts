const DICTIONARIES = {
  en: () =>
    import("./dictionaries/en-gb.json").then((module) => module.default),
  fr: () =>
    import("./dictionaries/fr-fr.json").then((module) => module.default),
  fallback: () =>
    import("./dictionaries/en-gb.json").then((module) => module.default),
};

export { DICTIONARIES };
