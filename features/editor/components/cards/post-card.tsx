import Image from 'next/image';

import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';

import { getToken } from '@/lib/auth-server';

import { CommentSection } from '@/features/comments/components/comment-section';
import { Presence } from '@/features/presence';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { PostWithImageUrl } from '../../model/types';

export async function PostCard(post: PostWithImageUrl) {
  const token = await getToken();

  const userId = await fetchQuery(api.presence.getUserId, {}, { token });

  return (
    <Card className="mb-0 overflow-hidden pt-0 shadow-2xl shadow-emerald-600/20 backdrop-blur-sm max-sm:rounded-b-none md:mb-8 dark:shadow-emerald-600/40">
      <div className="relative h-64 w-full overflow-hidden sm:h-80">
        {post.imageUrl ? (
          <>
            <Image
              src={post.imageUrl}
              alt={`Image for ${post.title}`}
              fill
              sizes="100%"
              loading="eager"
              className="mask-b-from-10% mask-b-to-90% object-cover"
              style={{
                maskImage: 'linear-gradient(to bottom, black 10%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 10%, transparent 100%)',
              }}
            />
          </>
        ) : (
          <div className="text-muted-foreground flex h-full w-full items-center justify-center">
            No preview available
          </div>
        )}
      </div>
      <CardHeader>
        <div className="-mt-8 mb-4 flex items-center justify-between gap-2">
          <p className="text-muted-foreground sm:text-md self-center text-sm">
            {new Date(post._creationTime).toLocaleDateString()}
          </p>
          <div className="flex items-center gap-2">
            <p className="text-muted-foreground sm:text-md self-center text-sm">Viewing now</p>
            <Presence roomId={post._id} userId={userId ?? undefined} />
          </div>
        </div>

        <h1 className="text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">{post.title}</h1>
        <Separator className="mt-4" />
      </CardHeader>
      <CardContent className="p-6 md:px-10">
        <p className="text-lg leading-relaxed tracking-tight antialiased sm:text-xl">{post.body}</p>
      </CardContent>
      <CardContent className="p-6 md:px-10">
        <Separator />
      </CardContent>
      <CardContent className="p-4 md:px-10">
        <CommentSection postId={post._id} />
      </CardContent>
    </Card>
  );
}
