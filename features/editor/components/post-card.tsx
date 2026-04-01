import Image from 'next/image';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { PostWithImageUrl } from '../model/types';

export async function PostCard(post: PostWithImageUrl) {
  return (
    <Card className="mb-8 overflow-hidden pt-0 shadow-2xl backdrop-blur-sm">
      <div className="relative h-64 w-full overflow-hidden sm:h-60">
        {post.imageUrl ? (
          <>
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              style={{
                maskImage: 'linear-gradient(to top, transparent 0%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 100%)',
              }}
            />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-500">
            No preview available
          </div>
        )}
      </div>
      <CardHeader>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {post.title}
        </h1>
        <Separator className="mx-2 mt-6" />
      </CardHeader>

      <CardContent className="px-12">
        <p className="text-lg leading-relaxed text-slate-300 antialiased sm:text-xl">{post.body}</p>
      </CardContent>
    </Card>
  );
}
