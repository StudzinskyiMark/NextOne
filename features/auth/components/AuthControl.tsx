'use client';

import { useConvexAuth } from 'convex/react';

import { AuthButtons } from './AuthButtons';
import { UserButton } from './UserButton';

export function AuthControl() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return <>{isLoading ? null : isAuthenticated ? <UserButton /> : <AuthButtons />}</>;
}
