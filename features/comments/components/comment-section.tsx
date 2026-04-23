'use client';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { usePaginatedQuery } from 'convex/react';
import { MessageSquare } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { AddCommentForm } from '../forms/add-comment-form';

// TODO Implement CommentsList component with infinite loading
// 1. Setup usePaginatedQuery to fetch comments via api.comments.getCommentsByPostID.
// 2. Create CommentCard UI: display author's avatar, name, creation date, and body text.
// 3. Implement Skeleton Loaders for the initial loading state and "Load More" actions.
// 4. Add an Empty State: "No comments yet. Be the first to share your thoughts!"
// 5. Bonus: Implement "Load More" button or Intersection Observer for infinite scroll.

export function CommentSection({ postId }: { postId: Id<'posts'> }) {
  const { results, status, loadMore } = usePaginatedQuery(
    api.comments.getCommentsByPostID,
    { postId },
    { initialNumItems: 2 } // Завантажуємо спочатку 2 коментарів
  );

  //   return (
  //     <div className="space-y-4">
  //       {results.map((comment) => (
  //       //   <CommentItem key={comment._id} comment={comment} />
  //       ))}

  //       {/* Кнопка довантаження */}
  //       {status === 'CanLoadMore' && (
  //         <button
  //           onClick={() => loadMore(5)}
  //           className="rounded-md bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
  //         >
  //           Завантажити ще
  //         </button>
  //       )}

  //       {status === 'LoadingMore' && <p>Завантаження коментарів...</p>}
  //     </div>
  //   );
  console.log(postId);
  return (
    <Card className="my-4">
      <CardHeader className="flex items-center gap-2">
        <MessageSquare className="size-4" />
        <h2 className="text-xl font-bold">Comments</h2>
      </CardHeader>
      <CardContent>
        <Separator className="my-2" />
        <AddCommentForm postId={postId} />
        <Separator className="my-2" />
      </CardContent>
    </Card>
  );
}
