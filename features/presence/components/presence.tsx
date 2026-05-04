'use client';

import { api } from '@/convex/_generated/api';
import usePresence from '@convex-dev/presence/react';

import { useGuestId } from '../model/use-guest-id';
import FacePile, { FacePileSkeleton } from './facepile';

interface PresenceProps {
  roomId: string;
  userId?: string | null;
}

export function Presence({ roomId, userId }: PresenceProps) {
  const guestId = useGuestId();
  const effectiveUserId = userId || guestId;
  const presenceState = usePresence(api.presence, roomId, effectiveUserId ?? '');

  // 1. Поки немає ID — скелетон
  if (!effectiveUserId) {
    return <FacePileSkeleton />;
  }

  // 2. Поки дані завантажуються (undefined) — скелетон
  if (presenceState === undefined) {
    return <FacePileSkeleton />;
  }

  // 3. Якщо нікого немає (або тільки ви) — приховуємо
  if (presenceState.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <FacePile presenceState={presenceState} />
    </div>
  );
}
