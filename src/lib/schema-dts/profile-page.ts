import { ProfilePage, WithContext } from "schema-dts";

const getSchemaProfilePage = (
  description: string,
  job: string,
): WithContext<ProfilePage> => {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Thibault Walterspieler",
    mainEntity: {
      "@type": "Person",
      name: "Thibault Walterspieler",
      description: description,
      jobTitle: job,
      affiliation: "WeAreStudio99",
      url: "https://walterspieler.dev",
      email: "thibs@wearestudio99.fr",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lyon",
        addressRegion: "Rhône-Alpes",
        addressCountry: "France",
      },
      worksFor: {
        "@type": "Organization",
        name: "WeAreStudio99",
        description: "Collective of freelance web developers && artists",
        email: "contact@wearestudio99.fr",
        url: "https://fr.linkedin.com/company/wearestudio99",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lyon",
          addressRegion: "Rhône-Alpes",
          addressCountry: "France",
        },
      },
    },
    sameAs: [
      "https://www.linkedin.com/in/thibault-walterspieler-84881716b/",
      "https://github.com/ThibaultWalterspieler",
      "https://stackoverflow.com/users/10094877/thibault-walterspieler",
      "https://www.malt.fr/profile/thibaultwalterspieler",
    ],
  };
};

export default getSchemaProfilePage;
