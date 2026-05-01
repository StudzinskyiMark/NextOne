import { getPostsAction } from '../actions/get-posts.action';
import { BlogPostCard } from './blog-post-card';

// IDEA Implement dynamic pagination for BlogPostsList
// 1. Convert component to 'use client' to enable Convex reactive pagination.
// 2. Replace direct fetch with usePaginatedQuery from 'convex/react'.
// 3. Use initialCount prop from siteSettings as the initialNumItems value.
// 4. Implement a "Load More" button or infinite scroll using status and loadMore.
// 5. Ensure BlogPostCardSkeleton is displayed during 'LoadingMore' state.

export async function BlogPostsList() {
  //   await new Promise((resolve) => setTimeout(resolve, 3000));
  const posts = await getPostsAction();

  return (
    <>
      {posts.map((post) => (
        <BlogPostCard key={post._id} data={post} />
      ))}
    </>
  );
}
