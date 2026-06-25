// widgets/landing/ui/announcement-banner.tsx
import { headers } from 'next/headers';

import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';
import { Megaphone } from 'lucide-react';

export async function AnnouncementBanner() {
  await headers();

  const settings = await fetchQuery(api.siteSettings.getSiteSettings);
  const announcement = settings?.announcement;

  if (!announcement?.enabled || !announcement?.text) {
    return null;
  }

  return (
    <div className="bg-primary text-primary-foreground mx-auto my-4 flex w-10/12 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all select-none">
      <Megaphone className="size-4 shrink-0" />
      <span className="text-center">{announcement.text}</span>
    </div>
  );
}
