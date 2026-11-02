import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Base URL from env, with a fallback for local development
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tviy-domen.com';

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/blog'],
      // Keep private routes and system folders out of search indexes
      disallow: ['/publish', '/auth/', '/api/', '/_next/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
