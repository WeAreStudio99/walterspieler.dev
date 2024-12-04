import { ProfilePage, WithContext } from "schema-dts";

const getSchemaProfilePage = (
  name: string,
  email: string,
  description: string,
  job: string,
): WithContext<ProfilePage> => {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "Thibault Walterspieler",
    mainEntity: {
      "@type": "Person",
      name: name,
      description: description,
      jobTitle: job,
      affiliation: "99Stud",
      url: "https://walterspieler.dev",
      email: email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lyon",
        addressRegion: "Rhône-Alpes",
        addressCountry: "France",
      },
      worksFor: {
        "@type": "Organization",
        name: "99Stud",
        description: "Collective of freelance web developers && artists",
        email: "contact@99stud.fr",
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
