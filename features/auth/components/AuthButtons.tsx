import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';

export function AuthButtons() {
  return (
    <>
      <Link className={buttonVariants({ variant: 'outline' })} href="/auth/sign-in">
        Sign In
      </Link>
      <Link className={buttonVariants({ variant: 'default' })} href="/auth/sign-up">
        Sign Up
      </Link>
    </>
  );
}
