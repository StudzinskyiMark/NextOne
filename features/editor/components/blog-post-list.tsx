import { getPostsAction } from '../actions/get-posts.action';
import { PostCard } from './post-card';

export async function BlogPostsList() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const posts = await getPostsAction();

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post._id} data={post} />
      ))}
    </>
  );
}
