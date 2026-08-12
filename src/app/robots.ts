import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: [
      'https://www.novusfuturesolutions.com/sitemap.xml',
      'https://www.novusfuturesolutions.com/sitemap.txt',
      'https://novusfuturesolutions.com/sitemap.xml',
      'https://novusfuturesolutions.com/sitemap.txt',
    ],
  };
}
