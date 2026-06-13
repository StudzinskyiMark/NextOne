'use client';

import Link from 'next/link';

import { Loader2, LogOut, Settings, User } from 'lucide-react';

import { authClient } from '@/lib/auth-client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useSignOut } from '../model/use-sign-out';

export function UserButton() {
  const { isPending: isSignOutPending, handleSignOut } = useSignOut();
  const { data: session, isPending: isSessionLoading } = authClient.useSession();

  if (isSessionLoading) {
    return <Loader2 className="text-muted-foreground size-8 animate-spin" />;
  }

  const user = session?.user;

  const initials = user?.name
    ? user.name.substring(0, 2).toUpperCase()
    : user?.email.substring(0, 2).toUpperCase() || 'US';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-x-4 overflow-hidden rounded-lg p-0 px-0 md:w-auto md:px-1"
        >
          <Avatar className="m-0 size-9 rounded-md p-0 md:size-7">
            <AvatarImage
              src={user?.image || ''}
              alt={user?.name || 'User avatar'}
              className="object-cover"
            />
            <AvatarFallback className="rounded-md bg-emerald-600/10 text-[10px] font-medium text-emerald-600">
              {initials}
            </AvatarFallback>
          </Avatar>

          <span className="hidden max-w-30 truncate pr-2 text-sm font-medium md:block">
            {user?.name || 'User'}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">{user?.name || 'User'}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {user?.email || 'No email available'}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="cursor-pointer">
              <User className="mr-2 size-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="cursor-pointer">
              <Settings className="mr-2 size-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleSignOut}
          disabled={isSignOutPending}
          className="cursor-pointer hover:text-red-500 focus:text-red-500"
        >
          {isSignOutPending ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <LogOut className="mr-2 size-4" />
          )}
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
