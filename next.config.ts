import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
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
    ],
  },
};

export default nextConfig;
