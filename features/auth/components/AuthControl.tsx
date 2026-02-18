'use client';
import { useConvexAuth } from 'convex/react';

import { Skeleton } from '@/components/ui/skeleton';

import { AuthButtons } from './AuthButtons';
import { UserButton } from './UserButton';

export function AuthControl() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <>
      {isLoading ? (
        <div className="flex items-center gap-x-4">
          <Skeleton className="h-9 w-20 rounded-md" />
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>
      ) : isAuthenticated ? (
        <UserButton />
      ) : (
        <AuthButtons />
      )}
    </>
  );
}
