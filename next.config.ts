import type { NextConfig } from 'next';

import { withSentryConfig } from '@sentry/nextjs';

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
        hostname: 'little-ocelot-18.eu-west-1.convex.cloud',
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

  cacheLife: {
    page: {
      stale: 60, // 1 хвилина (сервер віддасть старий кеш, паралельно оновлюючи його)
      revalidate: 600, // 10 хвилин (період валідації даних у фоні)
      expire: 3600, // 1 година (максимальний час життя кешу, після якого він точно помре)
    },
  },
  // Реєструємо кастомний профіль кешування "page", який вимагає твій додаток
  experimental: {},
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: 'nextone-77',

  project: 'next-one',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
