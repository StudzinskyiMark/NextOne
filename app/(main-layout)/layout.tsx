import { Suspense } from 'react';

import { Header } from '@/components/layouts/header';
import { MobileNav, MobileNavSkeleton } from '@/components/layouts/mobile-nav';

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <Suspense fallback={<MobileNavSkeleton />}>
        <MobileNav />
      </Suspense>
    </div>
  );
}
