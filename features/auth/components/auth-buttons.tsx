import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { buttonVariants } from '@/components/ui/button';

export function AuthButtons() {
  const pathname = usePathname();

  return (
    <>
      <Link
        className={buttonVariants({ variant: 'outline' })}
        href={`/auth/sign-in?callbackUrl=${pathname}`}
      >
        Sign In
      </Link>
      <Link
        className={buttonVariants({ variant: 'default' })}
        href={`/auth/sign-up?callbackUrl=${pathname}`}
      >
        Sign Up
      </Link>
    </>
  );
}
