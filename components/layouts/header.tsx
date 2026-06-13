import { Suspense } from 'react';

import { AuthControl } from '@/features/auth';
import { SearchHeaderWrapper } from '@/features/search-posts';

import { NavLinks } from './nav-links';
import { SiteBrand } from './site-brand';
import { ThemeToggle } from './theme-toggle';

export async function Header() {
  return (
    <nav className="flex w-full items-center justify-between py-5">
      <div className="flex items-center gap-6">
        <Suspense fallback={<div className="bg-muted h-8 w-27 animate-pulse rounded" />}>
          <SiteBrand />
        </Suspense>

        <div className="hidden items-center gap-4 sm:flex">
          <Suspense fallback={<div className="bg-muted h-10 w-20 animate-pulse" />}>
            <NavLinks />
          </Suspense>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <SearchHeaderWrapper />
        <ThemeToggle />
        <AuthControl />
      </div>
    </nav>
  );
}
