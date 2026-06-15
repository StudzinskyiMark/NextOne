'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navigationConfig } from '@/lib/navigation';
import { cn } from '@/lib/utils';

import { Skeleton } from '../ui/skeleton';

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-background/80 fixed right-0 bottom-0 left-0 z-50 flex items-center justify-around border-t px-4 py-3 backdrop-blur-md sm:hidden">
      {navigationConfig.map((item) => {
        const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);

        const orderClass = item.isAccent ? 'order-2' : item.href === '/' ? 'order-1' : 'order-3';

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.title}
            className={cn(
              'flex flex-col items-center justify-center gap-1 transition-transform active:scale-95',
              orderClass,
              item.isAccent
                ? 'bg-primary text-primary-foreground shadow-primary/30 rounded-full p-3 shadow-lg'
                : isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <item.icon className={cn('h-6 w-6', item.isAccent && 'h-7 w-7')} />

            {!item.isAccent && <span className="text-[10px] font-medium">{item.title}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileNavSkeleton() {
  return (
    <div className="bg-background/80 fixed right-0 bottom-0 left-0 z-50 flex h-[65px] items-center justify-around border-t px-4 py-3 backdrop-blur-md sm:hidden">
      <div className="flex flex-col items-center gap-1">
        <Skeleton className="h-6 w-6 rounded-md" />
        <Skeleton className="h-3 w-10" />
      </div>
      {/* Твоя кругла акцентна кнопка по центру */}
      <div className="p-3">
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <Skeleton className="h-6 w-6 rounded-md" />
        <Skeleton className="h-3 w-10" />
      </div>
    </div>
  );
}
