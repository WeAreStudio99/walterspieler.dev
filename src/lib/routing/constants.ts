import { PageKey, PageValue } from "./types";

const PAGES: Record<PageKey<"first">, PageValue> = {
  home: { i18nKey: "home", url: "" },
  experiences: { i18nKey: "experiences", url: "experiences" },
  blog: { i18nKey: "blog", url: "blog" },
  "99Stud": { i18nKey: "99Stud", url: "99stud" },
};

const PUBLIC_PATHS: string[] = [
  "/UI",
  "/images",
  "/robots.txt",
  "/favicon.ico",
  "/sitemap.xml",
];

export { PAGES, PUBLIC_PATHS };
