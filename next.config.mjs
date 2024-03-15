const nextConfig = async () => {
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

export default nextConfig;
