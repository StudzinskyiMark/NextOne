'use client';

import Image from 'next/image';

import type { PresenceState } from '@convex-dev/presence/react';

import { cn } from '@/lib/utils';

import { Skeleton } from '@/components/ui/skeleton';

export default function FacePile({ presenceState }: { presenceState: PresenceState[] }) {
  // Беремо перші 4 і розвертаємо масив, щоб використати flex-row-reverse
  const visible = presenceState.slice(0, 4).reverse();
  const hiddenCount = presenceState.length - visible.length;

  return (
    <div className="flex flex-row-reverse items-center justify-end">
      {visible.map((presence) => (
        <Avatar key={presence.userId} presence={presence} />
      ))}

      {hiddenCount > 0 && (
        <div className="border-background bg-muted text-muted-foreground relative -mr-3 flex h-8 w-8 items-center justify-center rounded-full border-2 text-[10px] font-medium ring-1 ring-black/5">
          +{hiddenCount}
        </div>
      )}
    </div>
  );
}

function Avatar({ presence }: { presence: PresenceState }) {
  const emoji = getEmojiForUserId(presence.userId);

  return (
    <div className="relative -mr-3 h-8 w-8 transition-transform hover:z-50 hover:-translate-y-1">
      <div
        className={cn(
          'border-background bg-secondary flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 text-sm shadow-sm ring-1 ring-black/5',
          presence.online ? 'border-emerald-500/50' : 'border-muted'
        )}
      >
        {presence.image ? (
          <Image
            src={presence.image}
            alt="user avatar"
            width={32}
            height={32}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="select-none">{emoji}</span>
        )}
      </div>
      {presence.online && (
        <span className="ring-background absolute right-0 bottom-0 block h-2 w-2 rounded-full bg-emerald-500 ring-2" />
      )}
    </div>
  );
}

export function FacePileSkeleton() {
  return (
    <div className="flex items-center -space-x-3">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="bg-secondary h-8 w-8 animate-pulse rounded-full shadow-sm" />
      ))}
    </div>
  );
}

function getEmojiForUserId(userId: string): string {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = (hash << 5) - hash + userId.charCodeAt(i);
    hash |= 0;
  }
  const emojis = ['👨‍💻', '👩‍💻', '🚀', '✨', '🔋', '💎', '🔥', '⚡', '🤖', '👾'];
  return emojis[Math.abs(hash) % emojis.length];
}
