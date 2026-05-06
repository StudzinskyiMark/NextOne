'use client';

import Image from 'next/image';

import type { PresenceState } from '@convex-dev/presence/react';

import { cn } from '@/lib/utils';

import { Skeleton } from '@/components/ui/skeleton';

export default function FacePile({ presenceState }: { presenceState: PresenceState[] }) {
  const visible = presenceState.slice(0, 3);
  const hiddenCount = presenceState.length - visible.length;

  return (
    <div className="flex flex-row items-center">
      {visible.map((presence, index) => (
        <div
          key={presence.userId}
          className={cn(
            'relative transition-transform duration-200 hover:-translate-y-1',
            index !== 0 && '-ml-2',
            '!hover:z-50'
          )}
          
          style={{ zIndex: visible.length - index }}
        >
          <Avatar presence={presence} />
        </div>
      ))}

      {hiddenCount > 0 && (
        <div
          className="border-primary-foreground bg-muted text-muted-foreground relative -ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-medium ring-1 ring-black/5"
          style={{ zIndex: -1 }}
        >
          +{hiddenCount}
        </div>
      )}
    </div>
  );
}

function Avatar({ presence }: { presence: PresenceState }) {
  const emoji = getEmojiForUserId(presence.userId);

  return (
    <div className="relative h-8 w-8">
      <div
        className={cn(
          'border-background bg-secondary flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 text-sm shadow-sm ring-1 ring-black/5',
          presence.online ? 'border-emerald-500/50' : 'border-primary-foreground'
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
        <span className="ring-background absolute right-0 bottom-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2" />
      )}
    </div>
  );
}

export function FacePileSkeleton() {
  return (
    <div className="flex items-center -space-x-2">
      {[...Array(4)].map((_, i) => (
        <Skeleton
          key={i}
          className="bg-secondary animate-in fade-in h-8 w-8 rounded-full shadow-sm"
        />
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
  const emojis = [
    // Розробка та Технології
    '👨‍💻',
    '👩‍💻',
    '🤖',
    '👾',
    '💻',
    '🖱️',
    '⚙️',
    '🛡️',
    '🔑',
    '📡',
    // Енергія та Космос
    '🚀',
    '✨',
    '🔥',
    '⚡',
    '☄️',
    '🌌',
    '🪐',
    '🌙',
    '🌟',
    '🛸',
    // Статус та Нагороди
    '💎',
    '🏆',
    '🎯',
    '🥇',
    '👑',
    '⭐',
    '🔋',
    '✅',
    '🌈',
    '🎐',
    // Творчість та Офіс
    '💡',
    '📚',
    '🖋️',
    '🎨',
    '🧠',
    '📢',
    '🧪',
    '🔭',
    '🌍',
    '🧭',
  ];
  return emojis[Math.abs(hash) % emojis.length];
}
