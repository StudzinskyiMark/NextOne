import Image from 'next/image';
import Link from 'next/link';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { fetchQuery } from 'convex/nextjs';
import { ArrowLeft } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';

interface PostIdProps {
  params: Promise<{
    id: Id<'posts'>;
  }>;
}

export default async function PostIdPage({ params }: PostIdProps) {
  const { id } = await params;
  const post = await fetchQuery(api.posts.getPostById, { postID: id });

  return (
    <div className="animate-in fade-in relative mx-auto max-w-3xl px-4 py-8 duration-300">
      <Link href="/blog" className={buttonVariants({ variant: 'secondary' })}>
        <ArrowLeft className="size-4" /> Go back
      </Link>

      <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-xl">
        {post?.imageUrl && <Image src={post.imageUrl} alt={`${post.title} image`} fill />}
      </div>
    </div>
  );
}
