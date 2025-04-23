import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import { languages, fallbackLng } from './locales/locales-config';

// Проверка: является ли путь ссылкой на статический файл
const isStaticFile = (pathname: string) =>
  /\.(jpg|jpeg|png|gif|webp|svg|css|js|ttf|woff|woff2|eot|otf|mp4|mov|webm|pdf|txt|ico)$/.test(
    pathname
  );

// Middleware
export function middleware(request: NextRequest) {
  // Обрабатываем только GET-запросы
  if (request.method !== 'GET') {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Пропускаем статику и общие файлы
  if (
    isStaticFile(pathname) ||
    pathname.startsWith('/robots') ||
    pathname.startsWith('/sitemap') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Проверка наличия локали в URL
  const pathnameHasLocale = languages.some((locale) => pathname.startsWith(`/${locale}`));

  if (!pathnameHasLocale) {
    const detectedLocale = request.cookies.get('i18next')?.value || fallbackLng;
    const locale = languages.includes(detectedLocale) ? detectedLocale : fallbackLng;

    // Без двойных слэшей
    const pathnameWithoutLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
    const redirectUrl = new URL(`/${locale}${pathnameWithoutLeadingSlash}`, request.url);

    const response = NextResponse.redirect(redirectUrl);
    response.headers.append('Set-Cookie', `i18next=${locale}; Path=/;`);

    return response;
  }

  return NextResponse.next();
}

// Настройка маршрутов для middleware
export const config = {
  matcher: ['/((?!api|_next|favicon.ico|robots.txt|sitemap.xml).*)'],
};
