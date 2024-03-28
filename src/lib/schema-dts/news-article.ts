import { NewsArticle, WithContext } from 'schema-dts';

const getSchemaNewsArticle = (
  headline: string,
  datePublished: string,
  dateModified: string
): WithContext<NewsArticle> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline,
    datePublished,
    dateModified,
    author: [
      {
        '@type': 'Person',
        name: 'Thibault Walterspieler',
        jobTitle: 'Fullstack Engineer',
        affiliation: 'WeAreStudio99',
        url: 'https://walterspieler.dev/',
      },
    ],
  };
};

export default getSchemaNewsArticle;
