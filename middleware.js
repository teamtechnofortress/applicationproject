import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';


async function verifyToken(token) {
  try {
    const apiRes = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/user/permission`, {
      method: 'GET',
      headers: {
        Cookie: `token=${token}`,
      },
    });

    if (apiRes.status === 401) {
      return 'expired';
    }

    if (!apiRes.ok) {
      throw new Error("API request failed");
    }
    const apiData = await apiRes.json();
    return apiData;
  } catch (error) {
    console.error("Error in verifyToken:", error);
    return null;
  }
}

// Middleware function
export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/signup';


  const token = request.cookies.get('token');

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (token) {
    const tokenData = token.value;
    const userData = await verifyToken(tokenData);
  
    if (userData === 'expired') {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.set('token', '', {
        path: '/',
        expires: new Date(0),
      });
      return response;
    }
  
    if (userData) {
      // ✅ Now apply path-based rules here
      if ((path === '/account/application' || path.startsWith('/account/editapplication') || path.startsWith('/account/tipps'))) {
        if (userData.subpaymenttype === 'subscription') {
          if (userData.substatus !== 'active') {
            return NextResponse.redirect(new URL('/account/allapplications', request.url));
          }
        } else if (userData.substatus === null && path === '/account/tipps') {
            return NextResponse.redirect(new URL('/account/allapplications', request.url));
        } else if (userData.substatus === null && path === '/account/application' && userData.applicationcount >= 1) {
            return NextResponse.redirect(new URL('/account/allapplications', request.url));
        } else if (userData.subpaymenttype === 'one-time') {
          const subCreatedAt = userData.subcreatedat ? new Date(userData.subcreatedat) : null;
          const isOneTimeExpired =
            userData.subpaymenttype === 'one-time' &&
            subCreatedAt &&
            new Date() - subCreatedAt > 4 * 24 * 60 * 60 * 1000;
          if (
            userData.substatus === null &&
            userData.applicationcount >= 1 &&
            (path === '/account/application' || path.startsWith('/account/editapplication'))
          ) {
            return NextResponse.redirect(new URL('/account/allapplications', request.url));
          }

          if (
            userData.subpaymenttype === 'one-time' &&
            (path.startsWith('/account/editapplication')) &&
            userData.substatus === 'succeeded' &&
            isOneTimeExpired 
          ) {
            return NextResponse.redirect(new URL('/account/allapplications', request.url));
          }

          if (
            path === '/account/application' &&
            userData.substatus === 'succeeded' &&
            userData.applicationcount >= 1
          ) {
            return NextResponse.redirect(new URL('/account/allapplications', request.url));
          }
        } else {
          if ((userData.substatus === null || userData.substatus !== "active" ) && path === '/account/tipps') {
            return NextResponse.redirect(new URL('/account/allapplications', request.nextUrl));
          }
          if (userData.substatus === null && userData.applicationcount >= 1) {
            return NextResponse.redirect(new URL('/account/allapplications', request.nextUrl));
          }
        }
      }
    }
  }
  
  return NextResponse.next();
}

// Middleware config to match specific paths
export const config = {
  matcher: [ '/signup', '/login', '/dashboard', '/form', '/account/:path*'],
};