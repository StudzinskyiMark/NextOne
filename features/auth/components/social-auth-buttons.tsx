'use client';

import { Button } from '@/components/ui/button';

import { GitHubIcon, GoogleIcon, LinkedInIcon } from '@/components/icons';

import { useSignIn } from '../model/use-sign-in';

export function SocialAuthButtons() {
  const { isSigningIn, signIn } = useSignIn();

  return (
    <div className="grid grid-cols-3 gap-3">
      {/* Google */}
      <Button
        variant="outline"
        type="button"
        disabled={isSigningIn}
        onClick={() => signIn({ provider: 'google' })}
        className="w-full px-0 sm:px-4"
      >
        <GoogleIcon className="size-5 shrink-0 sm:mr-2" />
        <span className="hidden text-sm font-medium sm:inline">Google</span>
      </Button>

      {/* GitHub */}
      <Button
        variant="outline"
        type="button"
        disabled={isSigningIn}
        onClick={() => signIn({ provider: 'github' })}
        className="w-full px-0 sm:px-4"
      >
        <GitHubIcon className="size-5 shrink-0 sm:mr-2" />
        <span className="hidden text-sm font-medium sm:inline">GitHub</span>
      </Button>

      {/* LinkedIn */}
      <Button
        variant="outline"
        type="button"
        disabled={isSigningIn}
        onClick={() => signIn({ provider: 'linkedin' })}
        className="w-full px-0 sm:px-4"
      >
        <LinkedInIcon className="size-5 shrink-0 sm:mr-2" />
        <span className="hidden text-sm font-medium sm:inline">LinkedIn</span>
      </Button>
    </div>
  );
}
