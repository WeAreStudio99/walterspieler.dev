import { withPayload } from "@payloadcms/next/withPayload";

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

export default withPayload(nextConfig);
