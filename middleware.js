import { NextResponse } from 'next/server';

// Middleware function
export function middleware(request) {
  const path = request.nextUrl.pathname;

  console.log('Path',path);

  const isPublicPath = path === '/login' || path === '/signup' || path === process.env.NEXT_PUBLIC_HOST;

  const token = request.cookies.get('token');
  
  if (path === '/') {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/account/allapplications', request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  return NextResponse.next();
}

// Middleware config to match specific paths
export const config = {
  matcher: ['/','/signup', '/login', '/dashboard', '/form', '/account/:path*'],
};
