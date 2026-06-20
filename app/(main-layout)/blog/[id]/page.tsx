import { Metadata } from 'next';
import Link from 'next/link';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { fetchQuery } from 'convex/nextjs';
import { ArrowLeft } from 'lucide-react';

import { PostCard } from '@/features/editor/components/cards/post-card';

import { buttonVariants } from '@/components/ui/button';

export async function generateMetadata({ params }: PostIdProps): Promise<Metadata> {
  const { id: postId } = await params;

  const post = await fetchQuery(api.posts.getPostById, { postId });

  if (!post) {
    return { title: 'Post not found!' };
  }

  return { title: post.title, description: post.body, authors: [{ name: post.authorID }] };
}

interface PostIdProps {
  params: Promise<{
    id: Id<'posts'>;
  }>;
}

export default async function PostIdPage({ params }: PostIdProps) {
  const { id } = await params;
  const post = await fetchQuery(api.posts.getPostById, { postId: id });

  if (!post) {
    return <div className="text-muted-foreground p-8 text-center">Post not found!</div>;
  }

  return (
    <>
      <div className="animate-in fade-in relative mx-auto max-w-4xl p-0 duration-300 sm:p-4">
        <Link
          href="/blog"
          className={buttonVariants({
            variant: 'ghost',
            className: 'text-muted-foreground mb-8 ml-8',
          })}
        >
          <ArrowLeft className="mr-2 size-4" /> Go back
        </Link>
        <PostCard {...post} />
      </div>
    </>
  );
}
