import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';

import { Header } from '@/components/layouts/header';

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await fetchQuery(api.siteSettings.getSiteSettings);

  return (
    <>
      <Header siteName={settings?.siteName || ''} />
      <main>{children}</main>
    </>
  );
}
