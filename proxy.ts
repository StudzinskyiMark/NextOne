import { NextRequest, NextResponse } from 'next/server';

import { get } from '@vercel/edge-config';
import { getSessionCookie } from 'better-auth/cookies';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. --- MAINTENANCE MODE (Vercel Edge Config) ---
  // Працюватиме тільки коли є змінна EDGE_CONFIG (на продакшені або при локальному підключенні)
  if (process.env.EDGE_CONFIG) {
    try {
      const isMaintenance = await get<boolean>('isMaintenanceMode');
      const isMaintenancePage = pathname === '/maintenance';

      // Якщо режим УВІМКНЕНО, і юзер НЕ на сторінці-заглушці
      if (isMaintenance && !isMaintenancePage) {
        const url = request.nextUrl.clone();
        url.pathname = '/maintenance';
        // rewrite підміняє контент, але залишає старий URL у браузері
        return NextResponse.rewrite(url);
      }

      // Якщо режим ВИМКНЕНО, але юзер пробує зайти на /maintenance вручну
      if (!isMaintenance && isMaintenancePage) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      console.error('Edge Config error:', error);
      // Якщо Edge Config недоступний, нічого не блокуємо, йдемо далі
    }
  }

  // 2. --- BETTER AUTH LOGIC ---
  const sessionCookie = getSessionCookie(request);

  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/publish');

  // Захист приватних роутів
  if (isProtectedRoute && !sessionCookie) {
    const signInUrl = new URL('/auth/sign-in', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Редирект авторизованих користувачів зі сторінок логіну
  if (pathname.startsWith('/auth') && sessionCookie) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Якщо все ок - пропускаємо запит до Next.js сервера
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
