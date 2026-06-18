'use cache';

import { Suspense } from 'react';

import { Metadata } from 'next';
import { cacheLife, cacheTag } from 'next/cache';

import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';

import { BlogPostCardSkeleton, BlogPostsList } from '@/features/editor';
import { BlogSearchBar } from '@/features/search-posts';

import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights, ideas, and real-world development stories',
};

export default async function BlogPage() {
  cacheLife('minutes');
  cacheTag('posts');

  const settings = await fetchQuery(api.siteSettings.getSiteSettings);

  const initialNumItems = settings?.postsPerPage ?? 6;

  return (
    <div className="container mx-auto max-w-6xl p-4">
      <div className="flex flex-col items-center justify-center gap-4 p-6 pb-8 text-center md:px-12">
        <h1 className="text-2xl font-bold tracking-wide md:text-3xl">Blog</h1>
        <p className="text-muted-foreground text-lg md:text-xl">
          Insights, ideas, and real-world development stories
        </p>
        <Separator className="my-2" />

        <BlogSearchBar />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 md:px-6 lg:grid-cols-3">
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
