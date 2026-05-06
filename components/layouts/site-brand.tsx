// components/layouts/site-brand.tsx
import Link from 'next/link';
import { connection } from 'next/server';

import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';

export async function SiteBrand() {
  await connection();

  const settings = await fetchQuery(api.siteSettings.getSiteSettings);
  const siteName = settings?.siteName ?? 'NextOne';
  const parts = siteName.split(/(?=[A-Z][a-z])/) ?? [];

  return (
    <Link href="/">
      <h1 className="text-2xl font-bold tracking-wider">
        {parts.length > 1 ? (
          <>
            {parts[0]}
            <span className="text-emerald-700 dark:text-emerald-500">
              {parts.slice(1).join('')}
            </span>
          </>
        ) : (
          siteName
        )}
      </h1>
    </Link>
  );
}
