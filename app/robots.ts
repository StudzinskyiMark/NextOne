import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Базовий URL з env або фолбек для локальної розробки
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tviy-domen.com';

  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/blog'],
      // Забороняємо індексацію приватних маршрутів та системних папок
      disallow: ['/publish', '/auth/', '/api/', '/_next/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}