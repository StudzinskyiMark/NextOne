import { Suspense } from 'react';

import Link from 'next/link';
import { connection } from 'next/server';

import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';

import { AuthControl } from '@/features/auth';
import { PublishButton } from '@/features/editor';

import { buttonVariants } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { SiteBrand } from './site-brand';
import { ThemeToggle } from './theme-toggle';

export async function Header() {
  return (
    <nav className="flex w-full items-center justify-between py-5">
      <div className="flex items-center gap-6">
        <Suspense fallback={<div className="bg-muted h-8 w-27 animate-pulse rounded" />}>
          <SiteBrand />
        </Suspense>

        <div className="flex items-center gap-4">
          <Link className={buttonVariants({ variant: 'ghost' })} href="/">
            Home
          </Link>
          <Link className={buttonVariants({ variant: 'ghost' })} href="/blog">
            Blog
          </Link>
          <PublishButton />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <AuthControl />
        <ThemeToggle />
      </div>
    </nav>
  );
}
