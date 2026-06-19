'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { LatestPostsBento } from '@/widgets/landing/ui/latest-posts-bento';
import { ArrowDown, ArrowLeft, Home } from 'lucide-react';

import { SearchBar } from '@/features/search-posts/components/search-bar';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  const router = useRouter();

  const scrollToExplore = () => {
    document.getElementById('explore-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative flex w-full flex-col items-center">
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 md:px-10">
        <div className="absolute top-1/2 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            404 <span className="text-muted-foreground mx-2 font-light">|</span> Not Found
          </h1>

          <p className="text-foreground mt-6 text-2xl font-bold">
            {`Oops! We're still working on it! 🛠️`}
          </p>

          <p className="text-muted-foreground mt-4 max-w-xl text-lg">
            {`This page doesn't exist yet or is currently under development. We're actively building new features,
            so some links might lead here.`}
          </p>

          <div className="mt-8 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
            <Button
              variant="secondary"
              size="lg"
              className="w-full gap-2 sm:w-auto"
              onClick={() => router.back()}
            >
              <ArrowLeft className="size-4" />
              Go Back
            </Button>

            <Button asChild size="lg" className="w-full gap-2 sm:w-auto">
              <Link href="/">
                <Home className="size-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <Button
            variant="outline"
            size="icon"
            className="border-border bg-background/50 h-10 w-10 animate-pulse rounded-full shadow-sm backdrop-blur-sm duration-1000"
            onClick={scrollToExplore}
            aria-label="Scroll down to explore"
          >
            <ArrowDown className="text-muted-foreground size-6" />
          </Button>
        </div>
      </section>

      <section
        id="explore-section"
        className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-20 md:px-10"
      >
        <div className="relative z-10 flex w-full max-w-5xl flex-col gap-20">
          {/* Рядок пошуку */}
          <div className="flex flex-col items-center text-center">
            <h2 className="text-foreground mb-6 text-2xl font-bold tracking-tight">
              Or find what you were looking for
            </h2>
            <div className="mx-auto w-full max-w-lg">
              <SearchBar />
            </div>
          </div>

          {/* Останні публікації (Bento Grid) */}
          <div className="flex flex-col items-center">
            <div className="mb-8 text-center">
              <h2 className="text-foreground text-2xl font-bold tracking-tight">Latest Posts</h2>
              <p className="text-muted-foreground mt-2">
                While we are building this page, read something interesting from our blog.
              </p>
            </div>

            {/* Обмежуємо ширину Bento Grid */}
            <div className="w-full max-w-2xl">
              <LatestPostsBento />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
