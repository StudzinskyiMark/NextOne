// app/(main-layout)/page.tsx
import { AnnouncementBanner } from '@/widgets/landing/ui/announcement-banner';
import { LatestPostsBento } from '@/widgets/landing/ui/latest-posts-bento';

export default function HomePage() {
  return (
    <main className="bg-background min-h-screen">
      <AnnouncementBanner />

      <div className="container mx-auto px-4 py-12">
        {/* Заголовок лендингу */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            NextOne: SaaS-platform of
            <br />
            <span className="text-emerald-500">new generation</span>
          </h1>
        </div>

        {/* Bento Grid */}
        <div className="grid auto-rows-[200px] grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {/* 1. Блок з постами (Карусель) */}
          {/* Займає 1 колонку в ширину і 2 в висоту */}
          <div className="md:col-span-1 md:row-span-2">
            <LatestPostsBento />
          </div>

          {/* 2. Блок ШІ-генератора (Центральний акцент) */}
          <div className="bg-card rounded-2xl border border-white/10 p-6 shadow-sm transition-colors hover:border-emerald-600/30 md:col-span-2 md:row-span-1">
            <h2 className="text-2xl font-bold">ШІ-Копірайтер</h2>
            <p className="text-muted-foreground mt-2">
              Генеруйте контент за секунди, використовуючи найсучасніші LLM.
            </p>
          </div>

          {/* 3. Блок Live Presence (Real-time) */}
          <div className="bg-card rounded-2xl border border-white/10 p-6 shadow-sm transition-colors hover:border-emerald-600/30 md:col-span-1 md:row-span-1">
            <h2 className="text-lg font-bold">Real-time</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Слідкуйте за активністю в реальному часі.
            </p>
          </div>

          {/* 4. Блок Tech Stack (Нижній широкий блок) */}
          <div className="bg-card rounded-2xl border border-white/10 p-6 shadow-sm transition-colors hover:border-emerald-600/30 md:col-span-2 md:row-span-1">
            <h2 className="text-xl font-bold">Технологічний стек</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Next.js 16 + Convex + Better Auth + FSD
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
