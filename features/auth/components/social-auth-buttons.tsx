'use client';

import { useState } from 'react';

import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { GitHub, Google, LinkedIn } from '@/components/icons';

import { useSignIn } from '../model/use-sign-in';

export function SocialAuthButtons() {
  const { signIn, isSigningIn } = useSignIn();

  const [activeProvider, setActiveProvider] = useState<'google' | 'github' | 'linkedin' | null>(
    null
  );

  const handleSocialSignIn = async (provider: 'google' | 'github' | 'linkedin') => {
    setActiveProvider(provider);
    try {
      await signIn({ provider });
    } catch (error) {
      setActiveProvider(null);
    }
  };

  return (
    <div className="flex w-full flex-col gap-y-2">
      {/* Кнопка Google */}
      <Button
        type="button"
        variant="outline"
        className="flex w-full items-center justify-center gap-x-2"
        disabled={isSigningIn}
        onClick={() => handleSocialSignIn('google')}
      >
        {isSigningIn && activeProvider === 'google' ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Google className="size-4" />
        )}
        <span>Continue with Google</span>
      </Button>

      {/* Кнопка GitHub */}
      <Button
        type="button"
        variant="outline"
        className="flex w-full items-center justify-center gap-x-2"
        disabled={isSigningIn}
        onClick={() => handleSocialSignIn('github')}
      >
        {isSigningIn && activeProvider === 'github' ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <GitHub className="size-4" />
        )}
        <span>Continue with GitHub</span>
      </Button>

      {/* Кнопка LinkedIn */}
      <Button
        type="button"
        variant="outline"
        className="flex w-full items-center justify-center gap-x-2"
        disabled={isSigningIn}
        onClick={() => handleSocialSignIn('linkedin')}
      >
        {isSigningIn && activeProvider === 'linkedin' ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <LinkedIn className="size-4" />
        )}
        <span>Continue with LinkedIn</span>
      </Button>
    </div>
  );
}
