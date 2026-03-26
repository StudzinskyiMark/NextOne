import { getPostsAction } from '../actions/get-posts.action';
import { BlogPostCard } from './blog-post-card';

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
