import { NextResponse } from 'next/server';


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
      if(path === '/account/application'){
        if ((userData.subpaymentcurrentplan === null && userData.applicationcount < 1) || (userData.subpaymentcurrentplan !== null && userData.subpaymentcurrentplan !== "4 Tage" && userData.substatus === "active") || (userData.subpaymentcurrentplan === "4 Tage" && userData.substatus === "active" && userData.applicationcount < 1)) {
          return NextResponse.next();
        }else{
          return NextResponse.redirect(new URL('/account/allapplications', request.url));
        }
      }
      if ((path.startsWith('/account/editapplication') || path.startsWith('/account/tipps'))) {
        if (userData.subpaymentcurrentplan === null || userData.substatus !== 'active') {
            return NextResponse.redirect(new URL('/account/allapplications', request.url));
        } 
      }
      if (path.startsWith('/account/subscriptiondetail')) {
        if (userData.subpaymentcurrentplan === null) {
            return NextResponse.redirect(new URL('/account/allapplications', request.url));
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