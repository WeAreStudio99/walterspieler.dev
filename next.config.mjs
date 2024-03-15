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
    async rewrites() {
      return [
        {
          source: '/ingest/static/:path*',
          destination: 'https://eu-assets.i.posthog.com/static/:path*',
        },
        {
          source: '/ingest/:path*',
          destination: 'https://eu.i.posthog.com/:path*',
        },
      ];
    },
  };
};

export default nextConfig;
