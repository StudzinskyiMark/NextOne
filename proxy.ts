import { NextRequest, NextResponse } from 'next/server';

import { getSessionCookie } from 'better-auth/cookies';

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  const isProtectedRoute =
    pathname.startsWith('/blog') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/publish');

  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (isProtectedRoute && !sessionCookie) {
    // Створюємо URL для сторінки входу
    const signInUrl = new URL('/auth/sign-in', request.url);

    // ВАЖЛИВО: Передаємо поточний шлях у callbackUrl
    signInUrl.searchParams.set('callbackUrl', pathname);

    return NextResponse.redirect(signInUrl);
  }

  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/blog', '/publish', '/dashboard'], // Specify the routes the proxy applies to
};
