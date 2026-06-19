'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LogInIcon, UserPlus } from 'lucide-react';

import { cn } from '@/lib/utils';

import { buttonVariants } from '@/components/ui/button';

export function AuthButtons() {
  const pathname = usePathname();

  return (
    <>
      <Link
        aria-label="Sign In"
        className={cn(buttonVariants({ variant: 'outline' }), 'size-9 p-0 md:w-28 md:px-4')}
        href={`/auth/sign-in?callbackUrl=${pathname}`}
      >
        <LogInIcon className="size-4 md:mr-2" />
        <span className="hidden md:inline">Sign In</span>
      </Link>

      <Link
        aria-label="Sign Up"
        className={cn(buttonVariants({ variant: 'default' }), 'size-9 p-0 md:w-28 md:px-4')}
        href={`/auth/sign-up?callbackUrl=${pathname}`}
      >
        <UserPlus className="size-4 md:mr-2" />
        <span className="hidden md:inline">Sign Up</span>
      </Link>
    </>
  );
}
