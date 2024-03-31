import { PageKey, PageValue } from './types';

const PAGES: Record<PageKey<'first'>, PageValue> = {
  home: { i18nKey: 'home', url: '' },
  works: { i18nKey: 'works', url: 'works' },
};

const PUBLIC_PATHS: string[] = [
  '/UI',
  '/images',
  '/robots.txt',
  '/favicon.ico',
  '/sitemap.xml',
];

export { PAGES, PUBLIC_PATHS };
