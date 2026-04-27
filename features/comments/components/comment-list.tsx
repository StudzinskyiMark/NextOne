import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { usePaginatedQuery } from 'convex/react';

import { CommentItem, CommentItemSkeleton } from './comment-item';
import { LoadMoreButton } from './load-more-button';

export function CommentList({ postId }: { postId: Id<'posts'> }) {
  const { results, status, loadMore } = usePaginatedQuery(
    api.comments.getCommentsByPostID,
    { postId },
    { initialNumItems: 10 } // load 10 comments at a time
  );

  const isLoadingFirstPage = status === 'LoadingFirstPage' && results.length === 0;

  const isEmpty = status !== 'LoadingFirstPage' && results.length === 0;

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 md:gap-6">
        {isLoadingFirstPage ? (
          Array.from({ length: 3 }).map((_, index) => <CommentItemSkeleton key={index} />)
        ) : isEmpty ? (
          <div className="animate-in fade-in flex flex-col items-center justify-center py-6 text-center duration-500">
            <p className="text-muted-foreground text-md italic">
              It looks like no one has commented yet...
              <br />
              Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          results.map((comment) => <CommentItem key={comment._id} comment={comment} />)
        )}
      </div>

      <LoadMoreButton status={status} onLoadMore={() => loadMore(10)} />
    </section>
  );
}
