export const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT;

/** @returns {Promise<import('next').NextConfig>} */
export default async () => {
  return {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.prismic.io',
        },
      ],
    },
  };
};
