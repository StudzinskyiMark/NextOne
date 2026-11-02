import { NextRequest, NextResponse } from 'next/server';

import { get } from '@vercel/edge-config';
import { getSessionCookie } from 'better-auth/cookies';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. --- MAINTENANCE MODE (Vercel Edge Config) ---
  // Only active when EDGE_CONFIG is set (production, or a local Edge Config connection)
  if (process.env.EDGE_CONFIG) {
    try {
      const isMaintenance = await get<boolean>('isMaintenanceMode');
      const isMaintenancePage = pathname === '/maintenance';

      // Maintenance ON and the user is not on the maintenance page
      if (isMaintenance && !isMaintenancePage) {
        const url = request.nextUrl.clone();
        url.pathname = '/maintenance';
        // rewrite serves the maintenance page but keeps the original URL
        return NextResponse.rewrite(url);
      }

      // Maintenance OFF but the user opened /maintenance directly
      if (!isMaintenance && isMaintenancePage) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      console.error('Edge Config error:', error);
      // If Edge Config is unavailable, don't block anything
    }
  }

  // 2. --- BETTER AUTH LOGIC ---
  const sessionCookie = getSessionCookie(request);

  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/publish');

  // Protect private routes
  if (isProtectedRoute && !sessionCookie) {
    const signInUrl = new URL('/auth/sign-in', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Redirect signed-in users away from the auth pages
  if (pathname.startsWith('/auth') && sessionCookie) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Otherwise, continue to the app
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
