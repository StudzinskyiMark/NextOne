import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        hostname: 'images.unsplash.com',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'joyous-bullfrog-329.convex.cloud',
        protocol: 'https',
        port: '',
      },
      {
        hostname: 'lh3.googleusercontent.com',
        protocol: 'https',
        port: '',
      },
    ],
  },
  // Реєструємо кастомний профіль кешування "page", який вимагає твій додаток
  experimental: {
    cacheLife: {
      page: {
        stale: 60, // 1 хвилина (сервер віддасть старий кеш, паралельно оновлюючи його)
        revalidate: 600, // 10 хвилин (період валідації даних у фоні)
        expire: 3600, // 1 година (максимальний час життя кешу, після якого він точно помре)
      },
    },
  },
};

export default nextConfig;
