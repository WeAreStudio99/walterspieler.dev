import { PageKey, PageValue } from "./types";

const PAGES: Record<PageKey<"first">, PageValue> = {
  home: { i18nKey: "home", url: "" },
  experiences: { i18nKey: "experiences", url: "experiences" },
  blog: { i18nKey: "blog", url: "blog" },
  weAreStudio99: { i18nKey: "weAreStudio99", url: "wearestudio99" },
};

const PUBLIC_PATHS: string[] = [
  "/UI",
  "/images",
  "/robots.txt",
  "/favicon.ico",
  "/sitemap.xml",
];

export { PAGES, PUBLIC_PATHS };
