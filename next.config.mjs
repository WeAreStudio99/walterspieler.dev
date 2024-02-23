export const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT;

/** @returns {Promise<import('next').NextConfig>} */
export default async () => {
  // const client = createClient(repositoryName);
  // const repository = await client.getRepository();
  // const locales = repository.languages.map((lang) => lang.id);
  // console.log('locales', locales);
  // return {
  //   i18n: {
  //     locales,
  //     defaultLocale: locales[0],
  //   },
  // };
  return {};
};
