import { api } from '@/convex/_generated/api';
import { FunctionReturnType } from 'convex/server';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

type CommentWithAuthor = FunctionReturnType<
  typeof api.comments.getCommentsByPostID
>['page'][number];

interface commentDataProps {
  comment: CommentWithAuthor;
}

export function CommentItem({ comment }: commentDataProps) {
  const dynamicGradient = `https://avatar.vercel.sh/${comment.author?.name}`;

  return (
    <div className="hover:bg-muted-foreground/10 flex gap-4 rounded-md p-4">
      <Avatar className="border-accent-foreground size-10 shrink-0 border-2">
        <AvatarImage
          src={comment.author?.image ?? dynamicGradient}
          alt={`${comment.author?.name} avatar`}
        />

        <AvatarFallback data-slot="avatar-fallback" className="text-sm font-medium">
          {comment.author?.name?.slice(0, 1)?.toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="flex flex-wrap items-center justify-between">
          <p className="text-md font-semibold">{comment.author?.name}</p>
          <p className="text-muted-foreground text-xs">
            {new Date(comment._creationTime).toLocaleString()}
          </p>
        </div>
        <p className="text-foreground/80 mt-4 text-sm leading-relaxed whitespace-pre-wrap">
          {comment.body}
        </p>
      </div>
    </div>
  );
}

export function CommentItemSkeleton() {
  return (
    <div className="flex gap-4 rounded-md p-4">
      <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-3 w-20" />
        </div>
        <div className="mt-4 space-y-2 pt-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
        </div>
      </div>
    </div>
  );
}
