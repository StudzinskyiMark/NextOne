'use client';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { signOutAction } from '../actions/sign-out-action';

// TODO Add dropdown menu for User
// Add User profile image and name with dropdown menu that include Settings, Sign Out and etc.

export function UserButton() {
  const router = useRouter();

  return (
    <>
      <Button
        onClick={() => {
          signOutAction(router);
        }}
      >
        Sign Out
      </Button>
    </>
  );
}
