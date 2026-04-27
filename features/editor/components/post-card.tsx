import Image from 'next/image';

import { CommentSection } from '@/features/comments/components/comment-section';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { PostWithImageUrl } from '../model/types';

export async function PostCard(post: PostWithImageUrl) {
  return (
    <Card className="mb-8 overflow-hidden pt-0 shadow-2xl shadow-emerald-600/20 backdrop-blur-sm dark:shadow-emerald-600/40">
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
        <p className="text-muted-foreground sm:text-md -mt-4 text-sm">
          {new Date(post._creationTime).toLocaleDateString()}
        </p>
        <h1 className="text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">{post.title}</h1>
        <Separator className="my-2" />
      </CardHeader>
      <CardContent className="px-10">
        <p className="text-lg leading-relaxed tracking-tight antialiased sm:text-xl">{post.body}</p>
      </CardContent>
      <CardContent>
        <CommentSection postId={post._id} />
      </CardContent>
    </Card>
  );
}
