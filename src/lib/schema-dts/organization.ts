import { Organization, WithContext } from 'schema-dts';

const getSchemaOrganization = (): WithContext<Organization> => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'WeAreStudio99',
    description: 'Collective of freelance web developers && artists',
    email: 'contact@wearestudio99.fr',
    url: 'https://fr.linkedin.com/company/wearestudio99',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lyon',
      addressRegion: 'Rhône-Alpes',
      addressCountry: 'France',
    },
  };
};

export default getSchemaOrganization;
