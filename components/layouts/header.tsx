import Link from 'next/link';

import { buttonVariants } from '../ui/button';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <nav className="flex w-full items-center justify-between py-5">
      <div className="flex items-center gap-6">
        <Link href="/">
          <h1 className="text-2xl font-bold">
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
          <Link className={buttonVariants({ variant: 'ghost' })} href="/create">
            Create
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link className={buttonVariants({ variant: 'outline' })} href="/auth/sign-in">
          Sign In
        </Link>
        <Link className={buttonVariants({ variant: 'default' })} href="/auth/sign-up">
          Sign Up
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
