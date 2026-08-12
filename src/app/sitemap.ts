import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.novusfuturesolutions.com';
  const routes = ['', '/jobs', '/professionals', '/companies', '/about', '/contact', '/blog', '/success-stories'];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/jobs' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/jobs' ? 0.9 : 0.8,
  }));
}
