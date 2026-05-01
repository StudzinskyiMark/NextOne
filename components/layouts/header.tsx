import Link from 'next/link';

import { AuthControl } from '@/features/auth';
import { PublishButton } from '@/features/editor';

import { buttonVariants } from '../ui/button';
import { ThemeToggle } from './theme-toggle';

interface HeaderProps {
  siteName?: string;
}

export function Header({ siteName }: HeaderProps) {
  const brandName = siteName || 'NextOne';
  const parts = brandName.split(/(?=[A-Z][a-z])/);

  return (
    <nav className="flex w-full items-center justify-between py-5">
      <div className="flex items-center gap-6">
        <Link href="/">
          <h1 className="text-2xl font-bold tracking-wider">
            {/* Next<span className="text-emerald-700 dark:text-emerald-500">One</span> */}
            {parts.length > 1 ? (
              <>
                {parts[0]}

                <span className="text-emerald-700 dark:text-emerald-500">
                  {parts.slice(1).join('')}
                </span>
              </>
            ) : (
              brandName
            )}
          </h1>
        </Link>

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
