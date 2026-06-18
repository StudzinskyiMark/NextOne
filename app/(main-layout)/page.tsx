import { AnnouncementBanner } from '@/widgets/landing/ui/announcement-banner';
import { LatestPostsBento } from '@/widgets/landing/ui/latest-posts-bento';
import { MessageSquare, Search, ShieldCheck, Sparkles, Terminal, Users } from 'lucide-react';

import { Footer } from '@/components/layouts/footer';

export default function HomePage() {
  return (
    <>
      <main className="bg-background container mx-auto min-h-screen max-w-6xl">
        <AnnouncementBanner />

        <div className="container mx-auto px-4 py-10 md:py-16">
          {/* Hero Section */}
          <div className="mb-14 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
              NextOne: Next-Generation <br />
              <span className="bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                SaaS Blog Platform
              </span>
            </h1>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
              From idea to publication in seconds. Powerful AI assistance, real-time presence, and
              secure workflows.
            </p>
          </div>

          {/* 1. ВЕРХНЯ ЧАСТИНА (3 колонки на десктопі, виправлено адаптив) */}
          {/* Змінено auto-rows на md:auto-rows-[220px], щоб на мобільних висота підлаштовувалася сама */}
          <div className="mx-auto grid grid-cols-1 gap-4 md:auto-rows-[220px] md:grid-cols-2 lg:grid-cols-3">
            {/* Latest Posts (Carousel) — тепер завжди row-span-2, щоб мати висоту навіть на телефонах */}
            <div className="row-span-2 md:col-span-1 md:row-span-2 lg:col-span-1 lg:row-span-2">
              <LatestPostsBento />
            </div>

            {/* AI Title Generator */}
            <div className="group border-border/50 bg-card/50 relative overflow-hidden rounded-3xl border p-8 shadow-sm backdrop-blur-xl transition-all hover:border-emerald-500/30 hover:shadow-md md:col-span-1 lg:col-span-2 lg:row-span-1">
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl transition-all group-hover:bg-emerald-500/20" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="mb-4 inline-flex rounded-xl bg-emerald-500/10 p-2.5 text-emerald-500 dark:text-emerald-400">
                    <Sparkles className="size-5" />
                  </div>
                  <h2 className="text-foreground text-2xl font-bold tracking-tight">
                    AI Title Generator
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    {`Create perfect headlines. Our integrated AI analyzes your draft and generates compelling titles in just a few seconds.`}
                  </p>
                </div>
              </div>
            </div>

            {/* Real-time Presence */}
            <div className="group border-border/50 bg-card/50 relative overflow-hidden rounded-3xl border p-8 shadow-sm backdrop-blur-xl transition-all hover:border-cyan-500/30 hover:shadow-md md:col-span-1 lg:col-span-1 lg:row-span-1">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl transition-all group-hover:bg-cyan-500/20" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="mb-4 inline-flex rounded-xl bg-cyan-500/10 p-2.5 text-cyan-500 dark:text-cyan-400">
                    <Users className="size-5" />
                  </div>
                  <h2 className="text-foreground text-xl font-bold tracking-tight">
                    Real-time Presence
                  </h2>
                  <p className="text-muted-foreground mt-2 text-sm">
                    {`See who's reading. Live avatars show active readers on your posts instantly.`}
                  </p>
                </div>
              </div>
            </div>

            {/* "Hello World" Greeting Block */}
            <div className="group border-border/50 bg-card/50 relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border p-8 text-center shadow-sm backdrop-blur-xl transition-all hover:border-pink-500/30 hover:shadow-md md:col-span-2 lg:col-span-1 lg:row-span-1">
              <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-pink-500/10 blur-3xl transition-all group-hover:bg-pink-500/20" />
              <div className="relative z-10">
                <Terminal className="mx-auto mb-3 size-8 text-pink-500 opacity-80" />
                <h2 className="text-foreground text-2xl font-black tracking-widest uppercase">
                  Hello <br /> World
                </h2>
              </div>
            </div>
          </div>

          {/* 2. НИЖНЯ ЧАСТИНА (4 колонки на десктопі, виправлено адаптив для планшетів md:) */}
          {/* md:auto-rows-[260px] гарантує правильну висоту на планшетах та ПК */}
          <div className="mx-auto mt-4 grid grid-cols-1 gap-4 md:auto-rows-[220px] md:grid-cols-2 lg:grid-cols-4">
            {/* Instant Search — md:col-span-2 розтягує його на повну ширину на планшеті */}
            <div className="group border-border/50 bg-card/50 relative overflow-hidden rounded-3xl border p-8 shadow-sm backdrop-blur-xl transition-all hover:border-amber-500/30 hover:shadow-md md:col-span-1 lg:col-span-1">
              <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl transition-all group-hover:bg-amber-500/20" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="mb-4 inline-flex rounded-xl bg-amber-500/10 p-2.5 text-amber-500 dark:text-amber-400">
                    <Search className="size-5" />
                  </div>
                  <h2 className="text-foreground text-xl font-bold tracking-tight">
                    Instant Search
                  </h2>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Database-level indexing. Full-text search across titles and bodies with
                    near-zero latency.
                  </p>
                </div>
              </div>
            </div>

            {/* Discussion Engine — md:col-span-1 розтягує його на повну ширину на планшеті */}
            <div className="group border-border/50 bg-card/50 relative overflow-hidden rounded-3xl border p-8 shadow-sm backdrop-blur-xl transition-all hover:border-rose-500/30 hover:shadow-md md:col-span-1 lg:col-span-1">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-rose-500/10 blur-3xl transition-all group-hover:bg-rose-500/20" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="mb-4 inline-flex rounded-xl bg-rose-500/10 p-2.5 text-rose-500 dark:text-rose-400">
                    <MessageSquare className="size-5" />
                  </div>
                  <h2 className="text-foreground text-xl font-bold tracking-tight">
                    Discussion Engine
                  </h2>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Structured community feedback loops with reactive data updates and pagination.
                  </p>
                </div>
              </div>
            </div>

            {/* Secure Authentication — md:col-span-2 розтягує його на повну ширину на планшеті */}
            <div className="group border-border/50 bg-card/50 relative flex flex-col justify-center overflow-hidden rounded-3xl border p-8 shadow-sm backdrop-blur-xl transition-all hover:border-violet-500/30 hover:shadow-md md:col-span-2 lg:col-span-2">
              <div className="absolute -right-10 -bottom-32 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl transition-all group-hover:bg-violet-500/20" />
              <div className="relative z-10 w-full">
                <div className="mb-4 inline-flex rounded-xl bg-violet-500/10 p-2.5 text-violet-500 dark:text-violet-400">
                  <ShieldCheck className="size-6" />
                </div>
                <h2 className="text-foreground text-2xl font-bold tracking-tight">
                  Secure Authentication
                </h2>
                <p className="text-muted-foreground mt-2 max-w-xl text-sm">
                  Powered by Better Auth. Seamless social sign-on (Google, GitHub, LinkedIn)
                  featuring encrypted server-side session tokens and automated CSRF protection
                  layers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
