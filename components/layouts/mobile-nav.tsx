'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navigationConfig } from '@/lib/navigation';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-background/80 fixed right-0 bottom-0 left-0 z-50 flex items-center justify-around border-t px-4 py-3 backdrop-blur-md sm:hidden">
      {navigationConfig.map((item) => {
        const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);

        const orderClass = item.isAccent
          ? 'order-2' // Центр
          : item.href === '/'
            ? 'order-1' // Ліворуч
            : 'order-3'; // Праворуч

        return (
          <Link
            key={item.href}
            href={item.href}
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
