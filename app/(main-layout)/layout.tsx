import { Header } from '@/components/layouts/header';

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* <Suspense fallback={<div className="bg-muted h-16 w-full animate-pulse" />}></Suspense> */}
      <Header />
      <main>{children}</main>
    </>
  );
}
