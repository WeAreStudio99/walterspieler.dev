import { I18N_CONFIG, I18N_LOCALES } from '@/lib/i18n/config';
import { createClient } from '@/prismicio';
import { MetadataRoute } from 'next';
import { BASE_URL } from '../../next.constants.mjs';

const prismicClient = createClient();

const STATIC_PATHS = ['open-source', 'wearestudio99', 'works'];

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const paths: Array<string> = [];

  for (const locale of I18N_LOCALES) {
    const workPages = await prismicClient.getAllByType('workPost', {
      lang: locale,
    });

    if (locale === I18N_CONFIG.defaultLocale) {
      paths.push(
        `${BASE_URL}/`,
        ...STATIC_PATHS.map((path) => `${BASE_URL}/${path}`),
        ...workPages.map((workPage) => `${BASE_URL}/works/${workPage.uid}`)
      );
    }

    paths.push(
      `${BASE_URL}/${locale}/`,
      ...STATIC_PATHS.map((path) => `${BASE_URL}/${locale}/${path}`),
      ...workPages.map(
        (workPage) => `${BASE_URL}/${locale}/works/${workPage.uid}`
      )
    );
  }

  const currentDate = new Date().toISOString();

  return paths.map((route) => ({
    url: route,
    lastModified: currentDate,
    changeFrequency: 'always',
  }));
};

export default sitemap;
