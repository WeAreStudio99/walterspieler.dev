/** @type {import('next').NextConfig} */
const nextConfig = async () => {
  return {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "images.prismic.io",
        },
      ],
    },
  };
};

module.exports = nextConfig;
