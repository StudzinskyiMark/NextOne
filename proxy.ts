import { NextRequest, NextResponse } from 'next/server';

import { getSessionCookie } from 'better-auth/cookies';

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  const isProtectedRoute =
    pathname.startsWith('/blog') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/publish');

  if (isProtectedRoute && !sessionCookie) {
    const signInUrl = new URL('/auth/sign-in', request.url);

    signInUrl.searchParams.set('callbackUrl', pathname);

    return NextResponse.redirect(signInUrl);
  }

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/publish', '/dashboard'], // Specify the routes the proxy applies to
};
