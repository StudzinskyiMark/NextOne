import Link from 'next/link';

import { AuthControl } from '@/features/auth';
import { PublishButton } from '@/features/editor';

import { buttonVariants } from '../ui/button';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <nav className="flex w-full items-center justify-between py-5">
      <div className="flex items-center gap-6">
        <Link href="/">
          <h1 className="text-2xl font-bold tracking-wider">
            Next<span className="text-emerald-600">One</span>
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
