import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="absolute top-5 left-5">
        <Link href="/" className={buttonVariants({ variant: 'outline' })}>
          <ArrowLeft className="mr-1" />
          Back to home
        </Link>
      </div>
      <div className="mx-auto w-full max-w-md">{children}</div>
    </div>
  );
}
