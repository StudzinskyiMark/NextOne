import { authClient } from '@/lib/auth-client';

import { Button } from '@/components/ui/button';

export function UserButton() {
  //   console.log('Sign Up success!');
  return (
    <>
      <Button
        onClick={() => {
          console.log('Sign Out!');
          authClient.signOut();
        }}
      >
        Sign Out
      </Button>
    </>
  );
}
