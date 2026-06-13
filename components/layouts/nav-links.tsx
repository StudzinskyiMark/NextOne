'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navigationConfig } from '@/lib/navigation';
import { cn } from '@/lib/utils';

import { buttonVariants } from '../ui/button';

export function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-6 md:gap-4">
      {navigationConfig.map((item) => {
        const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);

        if (item.isAccent) {
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(buttonVariants({ variant: 'default' }))}
            >
              <item.icon className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">{item.title}</span>
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              buttonVariants({ variant: 'tab' }),

              isActive && 'border-primary text-foreground'
            )}
          >
            <item.icon className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">{item.title}</span>
          </Link>
        );
      })}
    </div>
  );
}
