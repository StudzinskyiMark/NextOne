import { Suspense } from 'react';

import { BlogPostsList, PostCardSkeleton } from '@/features/editor';

export const dynamic = 'force-static';
export const revalidate = 60;
export default async function BlogPage() {
  //   const { posts, isLoading } = useGetPosts();

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
          fallback={Array.from({ length: 3 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        >
          <BlogPostsList />
        </Suspense>
      </div>
    </div>
  );
}
