'use client';

import * as React from 'react';

import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import Autoplay from 'embla-carousel-autoplay';

import { BlogPostCard, BlogPostCardSkeleton } from '@/features/editor/components/blog-post-card';

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

export function LatestPostsBento() {
  const posts = useQuery(api.posts.getLatestPosts);

  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className="group bg-card relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 p-4 shadow-sm transition-colors">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold tracking-tight">Latest Posts</h3>
        <span className="relative flex size-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
          <span className="relative inline-flex size-3 rounded-full bg-emerald-500"></span>
        </span>
      </div>

      <div className="flex-1">
        {posts === undefined ? (
          <BlogPostCardSkeleton />
        ) : posts.length === 0 ? (
          <div className="text-muted-foreground flex h-full items-center justify-center text-sm"></div>
        ) : (
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {posts.map((post) => (
                <CarouselItem key={post._id}>
                  <div className="p-1">
                    <BlogPostCard data={post} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </div>
  );
}
