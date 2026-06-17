'use client';

import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Megaphone } from 'lucide-react';

// Або AlertCircle, Megaphone тощо

export function AnnouncementBanner() {
  const announcement = useQuery(api.siteSettings.getAnnouncement);

  if (announcement === undefined || !announcement.enabled || !announcement.text) {
    return null;
  }

  return (
    <div className="bg-primary text-primary-foreground my-4 flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all select-none">
      <Megaphone className="size-4 shrink-0" />
      <span className="text-center">{announcement.text}</span>
    </div>
  );
}
