import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { PostWithImageUrl } from '../model/types';

interface PostCardProps {
  data: PostWithImageUrl;
}

// TODO Add Spotlight Effect on Hover
// - [ ] **Setup Framer Motion:** Ensure `framer-motion` is installed and imported.
// - [ ] **Motion Values:** Initialize `useMotionValue(0)` for both X and Y to track coordinates without triggering React re-renders.
// - [ ] **Smooth Dynamics:** Wrap motion values in `useSpring` (e.g., `stiffness: 150, damping: 20`) to create a fluid "trailing" effect that follows the cursor.
// - [ ] **Dynamic Background:** Use `useMotionTemplate` to construct a `radial-gradient` string, injecting the spring-animated X and Y values.
// - [ ] **Glow Layer:** Add a `motion.div` with an absolute position and `pointer-events-none` to display the emerald-600 glow.
// - [ ] **Interactive Trigger:** Implement `onMouseMove` on the parent container to update motion values via `mouseX.set()` and `mouseY.set()`.
// - [ ] **Visual Polish:** Set the glow opacity to `0` by default and switch to `100` on `group-hover` for a seamless entrance.

// IDEA Add Like & Save buttons to Post Cards
// - UI: v1 (Smart Visibility) — lg:hover (100% opacity) / Mobile (80% opacity).
// - Style: Glassmorphism + Emerald accent on hover/active.
// - UX: e.stopPropagation() to prevent navigation; touch targets 40x40px.

/* 
  Quick Briefs:
  v1: Hidden on PC, shows on hover. Semi-visible on Mobile. Best for UX.
  v2: "Three dots" menu icon instead of direct buttons. Maximum clean UI.
*/

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const BlogPostCard = ({ data }: PostCardProps) => {
  return (
    <div className="group relative h-full">
      <div className="absolute rounded-xl bg-emerald-600/40 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 dark:-inset-1" />

      <Card className="relative h-80 border-white/10 pt-0 transition-all duration-300 will-change-transform group-hover:border-emerald-600/50 hover:scale-102">
        <Link
          href={`/blog/${data?._id}`}
          className="absolute inset-0 z-10"
          aria-label={data.title}
        />
        <div className="bg-muted relative h-44 w-full overflow-hidden rounded-xl">
          <Image
            src={data.imageUrl ?? PLACEHOLDER_IMAGE}
            alt="post image"
            loading="eager"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-400 group-hover:scale-105"
          />
        </div>
        <CardHeader>
          <h3 className="text-lg font-bold">{data.title}</h3>
        </CardHeader>

        <CardContent>
          <p className="text-muted-foreground line-clamp-2 text-sm">{data.body}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export const PostCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="mb-4 h-40 w-full" />
        <Skeleton className="h-7 w-3/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
  );
};
