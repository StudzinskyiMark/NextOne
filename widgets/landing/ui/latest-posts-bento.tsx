'use client';

import * as React from 'react';

import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import Autoplay from 'embla-carousel-autoplay';

import {
  BlogPostCard,
  BlogPostCardSkeleton,
} from '@/features/editor/components/cards/blog-post-card';

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

export function LatestPostsBento() {
  const posts = useQuery(api.posts.getLatestPosts);
  const plugin = React.useRef(Autoplay({ delay: 3500, stopOnInteraction: true }));

  return (
    <div className="group border-border/50 bg-card/50 relative flex h-full flex-col overflow-hidden rounded-3xl border p-6 pb-8 shadow-sm backdrop-blur-xl transition-all hover:border-emerald-500/30 hover:shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-foreground text-xl font-bold tracking-tight">Latest Posts</h3>
        <span className="relative flex size-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
          <span className="relative inline-flex size-3 rounded-full bg-emerald-500"></span>
        </span>
      </div>

      <div className="flex-1 overflow-hidden">
        {posts === undefined ? (
          <BlogPostCardSkeleton />
        ) : posts.length === 0 ? (
          <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
            No posts yet
          </div>
        ) : (
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-2">
              {posts.map((post) => (
                <CarouselItem key={post._id} className="pr-1 pb-1">
                  <div className="w-full">
                    <BlogPostCard data={post} variant="carousel" />
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
