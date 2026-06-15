'use client';
import { useConvexAuth } from 'convex/react';

import { Skeleton } from '@/components/ui/skeleton';

import { AuthButtons } from './auth-buttons';
import { UserButton } from './user-button';

export function AuthControl() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <>
      {isLoading ? (
        <div className="flex items-center gap-x-4">
          <Skeleton className="h-9 w-9 rounded-md md:w-28" />
          <Skeleton className="h-9 w-9 rounded-md md:w-28" />
        </div>
      ) : isAuthenticated ? (
        <UserButton />
      ) : (
        <AuthButtons />
      )}
    </>
  );
}
