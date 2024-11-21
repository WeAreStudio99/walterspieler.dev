import { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      disallow: ["/dist/"],
      allow: ["/"],
    },
  ],
});

export default robots;

// Enforces that this route is used as static rendering
// @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
export const dynamic = "error";
