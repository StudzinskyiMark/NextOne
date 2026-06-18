import Image from 'next/image';
import Link from 'next/link';

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

// export const BlogPostCard = ({ data }: PostCardProps) => {
//   return (
//     <div className="group relative flex h-full flex-col">
//       <div className="absolute rounded-xl bg-emerald-600/40 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 dark:-inset-1" />

//       <Card className="relative mx-0 flex h-full flex-col border-white/10 py-4 pt-0 transition-all duration-300 will-change-transform group-hover:border-emerald-600/50 hover:scale-[1.02] max-md:mx-4">
//         <Link
//           href={`/blog/${data?._id}`}
//           className="absolute inset-0 z-10"
//           aria-label={data.title}
//         />

//         <div className="relative aspect-video w-full overflow-hidden rounded-xl">
//           <Image
//             src={data.imageUrl || ''}
//             alt={data.title || 'post image'}
//             loading="lazy"
//             fill
//             className="absolute inset-0 h-full w-full object-cover transition-transform duration-400 group-hover:scale-105"
//           />
//         </div>

//         <CardHeader className="flex-1">
//           <h3 className="line-clamp-2 text-lg leading-tight font-bold">{data.title}</h3>
//         </CardHeader>
//         <CardContent>
//           <p className="text-muted-foreground line-clamp-3 text-sm">{data.body}</p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export const BlogPostCardSkeleton = () => {
//   return (
//     <Card className="h-80 animate-pulse">
//       <CardHeader>
//         <Skeleton className="mb-4 h-40 w-full" />
//         <Skeleton className="h-7 w-3/4" />
//       </CardHeader>
//       <CardContent>
//         <Skeleton className="mb-1 h-4 w-full" />
//         <Skeleton className="h-4 w-5/6" />
//       </CardContent>
//     </Card>
//   );
// };
// features/editor/components/blog-post-card.tsx

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { PostWithImageUrl } from '../model/types';

interface PostCardProps {
  data: PostWithImageUrl;
}

// Стандартна утиліта Shadcn

// Створюємо варіанти для самої картки
const cardVariants = cva(
  'relative mx-0 flex h-full flex-col border-white/10 py-4 pt-0 transition-all duration-300 will-change-transform max-md:mx-4',
  {
    variants: {
      variant: {
        default: 'group-hover:border-emerald-600/50 hover:scale-[1.02]',
        carousel: 'hover:border-emerald-600/30', // Без скейлу, м'якший бордер
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface PostCardProps extends VariantProps<typeof cardVariants> {
  data: PostWithImageUrl;
}

export const BlogPostCard = ({ data, variant = 'default' }: PostCardProps) => {
  return (
    <div className="group relative flex h-full flex-col">
      {/* Світіння рендеримо ТІЛЬКИ для дефолтного варіанту */}
      {variant === 'default' && (
        <div className="absolute rounded-xl bg-emerald-600/40 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 dark:-inset-1" />
      )}

      <Card className={cn(cardVariants({ variant }))}>
        <Link
          href={`/blog/${data?._id}`}
          className="absolute inset-0 z-10"
          aria-label={data.title}
        />

        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
          <Image
            src={data.imageUrl || ''}
            alt={data.title || 'post image'}
            loading="lazy"
            fill
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-transform duration-400',
              // Картинка збільшується тільки в дефолтному варіанті
              variant === 'default' && 'group-hover:scale-105'
            )}
          />
        </div>

        <CardHeader className="flex-1">
          <h3 className="line-clamp-2 text-lg leading-tight font-bold">{data.title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3 text-sm">{data.body}</p>
        </CardContent>
      </Card>
    </div>
  );
};

// Скелетон залишаємо без змін
export const BlogPostCardSkeleton = () => {
  return (
    <Card className="h-80 animate-pulse">
      <CardHeader>
        <Skeleton className="mb-4 h-40 w-full" />
        <Skeleton className="h-7 w-3/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="mb-1 h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
  );
};
