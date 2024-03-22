const nextConfig = async () => {
  return {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.glsl$/,
        use: 'webpack-glsl-loader',
      });

      return config;
    },
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
