import { withPayload } from "@payloadcms/next/withPayload";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.prismic.io",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/works/:slug",
        destination: "/experiences/:slug",
        permanent: true,
      },
      {
        source: "/works",
        destination: "/experiences",
        permanent: true,
      },
    ];
  },
};

export default withPayload(nextConfig);
