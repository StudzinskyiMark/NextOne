import { Suspense } from 'react';

import { AuthControl } from '@/features/auth';
import { SearchHeaderWrapper } from '@/features/search-posts';

import { DesktopNavSkeleton, NavLinks } from './nav-links';
import { SiteBrand } from './site-brand';
import { ThemeToggle } from './theme-toggle';

export async function Header() {
  return (
    <header className="flex w-full items-center justify-between px-6 py-6 md:px-10">
      <div className="flex items-center gap-6">
        <Suspense fallback={<div className="bg-muted h-8 w-27 animate-pulse rounded" />}>
          <SiteBrand />
        </Suspense>

        <div className="hidden items-center gap-4 sm:flex">
          <Suspense fallback={<DesktopNavSkeleton />}>
            <NavLinks />
          </Suspense>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <SearchHeaderWrapper />
        <ThemeToggle />
        <AuthControl />
      </div>
    </header>
  );
}
