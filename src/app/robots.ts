import { MetadataRoute } from 'next';
import { BASE_URL } from '../../next.constants.mjs';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
