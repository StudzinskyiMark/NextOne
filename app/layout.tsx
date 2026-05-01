import { Geist, Geist_Mono } from 'next/font/google';

import { api } from '@/convex/_generated/api';
import { ConvexClientProvider } from '@/providers/convex-client-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { fetchQuery } from 'convex/nextjs';

import { Toaster } from '@/components/ui/sonner';

import '@/styles/globals.css';

// TODO: Final SEO & Assets Checklist before deployment
// 1. Production URL: Replace 'https://tviy-domen.com' with your actual Vercel/custom domain.
// 2. Favicon: Place 'favicon.ico' (32x32) and 'apple-touch-icon.png' (180x180) in the /public folder.
// 3. OG Image: Create a 1200x630 'og-image.png' with the site branding and place it in /public.
// 4. Manifest: Consider adding 'manifest.json' for PWA support and mobile browser theme colors.

export async function generateMetadata() {
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
      apple: '/apple-touch-icon.png', // Додав для кращого вигляду на iPhone
    },
    // Open Graph
    openGraph: {
      title: siteName,
      description: settings?.siteDescription ?? 'Developer Platform',
      url: 'https://tviy-domen.com', // FIXME: Update to production URL
      siteName: siteName,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: '/og-image.png', // FIXME: Ensure this exists in /public
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="mx-auto w-full max-w-7xl px-2 md:px-4 lg:px-6">
            <ConvexClientProvider>{children}</ConvexClientProvider>
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
