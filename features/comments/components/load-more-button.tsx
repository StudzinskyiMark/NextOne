import { usePaginatedQuery } from 'convex/react';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

type PaginationStatus = ReturnType<typeof usePaginatedQuery>['status'];

interface LoadMoreButtonProps {
  status: PaginationStatus;
  onLoadMore: () => void;
}

export function LoadMoreButton({ status, onLoadMore }: LoadMoreButtonProps) {
  if (status === 'Exhausted' || status === 'LoadingFirstPage') return null;

  return (
    <Button
      variant="secondary"
      className="mx-auto block"
      onClick={onLoadMore}
      disabled={status === 'LoadingMore'}
    >
      {status === 'LoadingMore' ? <Loader2 className="size-4 animate-spin" /> : 'Load more'}
    </Button>
  );
}
