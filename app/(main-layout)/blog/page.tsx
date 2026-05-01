import { Suspense } from 'react';

import { Metadata } from 'next';

import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';

import { BlogPostCardSkeleton, BlogPostsList } from '@/features/editor';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, ideas, and real-world development stories',
};

export const dynamic = 'force-static';
export const revalidate = 60;
export default async function BlogPage() {
  const settings = await fetchQuery(api.siteSettings.getSiteSettings);

  const initialNumItems = settings?.postsPerPage ?? 6;

  return (
    <div className="py-4">
      <div className="pb-8 text-center">
        <h1 className="text-2xl font-bold tracking-wide md:text-3xl">Blog</h1>
        <p className="text-muted-foreground text-lg md:text-xl">
          Insights, ideas, and real-world development stories
        </p>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-6 max-md:px-6 md:grid-cols-2 lg:grid-cols-3">
        <Suspense
          fallback={Array.from({ length: initialNumItems }).map((_id, i) => (
            <BlogPostCardSkeleton key={i} />
          ))}
        >
          <BlogPostsList />
        </Suspense>
      </div>
    </div>
  );
}
