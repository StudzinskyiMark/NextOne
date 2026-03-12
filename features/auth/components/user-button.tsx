'use client';

import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useSignOut } from '../model/use-sign-out';

// TODO Add dropdown menu for User
// Add User profile image and name with dropdown menu that include Settings, Sign Out and etc.

export function UserButton() {
  const { isPending, handleSignOut } = useSignOut();

  return (
    <>
      <Button disabled={isPending} className="w-32" onClick={handleSignOut}>
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" /> <span>Sign Out</span>
          </>
        ) : (
          <span>Sign Out</span>
        )}
      </Button>
    </>
  );
}
