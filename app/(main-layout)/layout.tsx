import { Header } from '@/components/layouts/header';
import { MobileNav } from '@/components/layouts/mobile-nav';

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />

      {/* Додаємо pb-20 (padding-bottom), щоб контент не ховався за мобільним баром! */}
      <main className="flex-1 pb-20 md:pb-0">{children}</main>

      <MobileNav />
    </div>
  );
}
