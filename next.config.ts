import { withPayload } from "@payloadcms/next/withPayload";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      {
        source: "/fr-fr/:path*",
        destination: "/fr/:path*",
        permanent: true,
      },
      {
        source: "/fr-fr",
        destination: "/fr",
        permanent: true,
      },
    ];
  },
};

export default withPayload(nextConfig);
