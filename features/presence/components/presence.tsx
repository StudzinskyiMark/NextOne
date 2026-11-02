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

  // 1. No ID yet: show a skeleton
  if (!effectiveUserId) {
    return <FacePileSkeleton />;
  }

  // 2. Data still loading (undefined): show a skeleton
  if (presenceState === undefined) {
    return <FacePileSkeleton />;
  }

  // 3. Nobody else here (or only you): hide
  if (presenceState.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <FacePile presenceState={presenceState} />
    </div>
  );
}
