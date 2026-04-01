import Link from 'next/link';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { fetchQuery } from 'convex/nextjs';
import { ArrowLeft } from 'lucide-react';

import { PostCard } from '@/features/editor/components/post-card';

import { buttonVariants } from '@/components/ui/button';

interface PostIdProps {
  params: Promise<{
    id: Id<'posts'>;
  }>;
}

export default async function PostIdPage({ params }: PostIdProps) {
  const { id } = await params;
  const post = await fetchQuery(api.posts.getPostById, { postID: id });

  if (!post) {
    return <div className="text-muted-foreground p-8 text-center">Post not found!</div>;
  }

  return (
    <>
      <div className="animate-in fade-in relative mx-auto max-w-5xl duration-300">
        <Link
          href="/blog"
          className={buttonVariants({
            variant: 'ghost',
            className: 'text-muted-foreground mb-8 ml-8 hover:text-white',
          })}
        >
          <ArrowLeft className="mr-2 size-4" /> Go back
        </Link>
        <PostCard {...post} />
      </div>
    </>
  );
}
