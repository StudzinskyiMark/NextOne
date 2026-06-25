import { Geist, Geist_Mono } from 'next/font/google';

import { api } from '@/convex/_generated/api';
import { ConvexClientProvider } from '@/providers/convex-client-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { fetchQuery } from 'convex/nextjs';
// import 'highlight.js/styles/atom-one-dark.css';

import 'highlight.js/styles/monokai.css';

import { cn } from '@/lib/utils';

import { Toaster } from '@/components/ui/sonner';

import '@/styles/globals.css';

// TODO: Final SEO & Assets Checklist before deployment
// 1. Production URL: Replace 'https://tviy-domen.com' with your actual Vercel/custom domain.
// 2. Favicon: Place 'favicon.ico' (32x32) and 'apple-touch-icon.png' (180x180) in the /public folder.
// 3. OG Image: Create a 1200x630 'og-image.png' with the site branding and place it in /public.
// 4. Manifest: Consider adding 'manifest.json' for PWA support and mobile browser theme colors.

export async function generateMetadata() {
  'use cache';
  //   await connection();
  try {
    const settings = await fetchQuery(api.siteSettings.getSiteSettings);
    const siteName = settings?.siteName ?? 'NextOne';

    return {
      title: {
        default: siteName,
        template: `%s | ${siteName}`,
      },
      authors: [{ name: 'Mark Studzinskyi' }],
      description: settings?.siteDescription ?? 'Developer Platform',
      icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png',
      },
      // Open Graph
      openGraph: {
        title: siteName,
        description: settings?.siteDescription ?? 'Developer Platform',
        url: 'https://next-one-ebon-chi.vercel.app',
        siteName: siteName,
        locale: 'en_US',
        type: 'website',
        images: [
          {
            url: '/og-image.png',
            width: 1200,
            height: 630,
            alt: siteName,
          },
        ],
      },

      // Twitter
      twitter: {
        card: 'summary_large_image',
        title: siteName,
        images: ['/og-image.png'],
      },

      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      title: { default: 'NextOne', template: '%s | NextOne' },
    };
  }
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          'antialiased',
          'bg-background min-h-screen font-sans antialiased',
          'selection:bg-emerald-500/30 selection:text-gray-800 dark:selection:text-emerald-50'
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="mx-auto w-full">
            <ConvexClientProvider>{children}</ConvexClientProvider>
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
