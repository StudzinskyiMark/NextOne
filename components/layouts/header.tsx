import { Suspense } from 'react';

import Link from 'next/link';

import { AuthControl } from '@/features/auth';
import { PublishButton } from '@/features/editor';
import { SearchHeaderWrapper } from '@/features/search-posts';

import { buttonVariants } from '../ui/button';
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
        <SearchHeaderWrapper />
        <AuthControl />
        <ThemeToggle />
      </div>
    </nav>
  );
}
