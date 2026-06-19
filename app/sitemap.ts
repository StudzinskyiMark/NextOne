import type { MetadataRoute } from 'next';

import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://my-domen.com'; // Заміниш на свій домен перед деплоєм

  // 1. Статичні сторінки платформи
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // 2. Динамічні сторінки (Пости з Convex)
  let dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    const posts = await fetchQuery(api.posts.getPosts);

    if (posts && Array.isArray(posts)) {
      dynamicRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post._id}`,

        lastModified: new Date(post._creationTime),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch posts for sitemap:', error);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
