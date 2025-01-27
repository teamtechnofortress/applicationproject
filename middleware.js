import { NextResponse } from 'next/server';

// Middleware function
export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/signup';

  const token = request.cookies.get('token');

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  return NextResponse.next();
}

// Middleware config to match specific paths
export const config = {
  matcher: [ '/signup', '/login', '/dashboard', '/form', '/account/:path*'],
};
