import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { PostWithImageUrl } from '../model/types';

export async function PostCard(post: PostWithImageUrl) {
  return (
    <Card className="overflow-hidden pt-0 shadow-2xl backdrop-blur-sm mb-8">
      <CardContent className="p-0">
        <div className="relative h-64 w-full overflow-hidden sm:h-60">
          {post.imageUrl ? (
            <>
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                style={{
                  // Маска плавно ховає низ зображення
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

        <div className="px-6 pb-10 sm:px-12">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            <Separator className="my-8" />

            <div className="prose prose-invert prose-lg max-w-none px-6">
              <p className="text-lg leading-relaxed text-slate-300 antialiased sm:text-xl">
                {post.body}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
