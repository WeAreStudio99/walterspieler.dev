import { PageKey, PageValue } from "./types";

const PAGES: Record<PageKey<"first">, PageValue> = {
  home: { i18nKey: "home", url: "" },
  works: { i18nKey: "works", url: "works" },
  blog: { i18nKey: "blog", url: "blog" },
  lab: { i18nKey: "lab", url: "lab" },
  weAreStudio99: { i18nKey: "weAreStudio99", url: "wearestudio99" },
};

const PUBLIC_PATHS: string[] = [
  "/UI",
  "/images",
  "/models",
  "/robots.txt",
  "/favicon.ico",
  "/sitemap.xml",
];

export { PAGES, PUBLIC_PATHS };
