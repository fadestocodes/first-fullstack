import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';

// 1. Define protected routes (i.e., /admin and its sub-routes)
const protectedRoutes = ['/admin', '/admin/:path*']; // Protect all /admin routes

export async function middleware(req) {
  console.log('Middleware triggered for:', req.url);

  // 2. Check if the current route is a protected one
  const isProtectedRoute = protectedRoutes.some(route => req.url.startsWith(route));

  // 3. If it’s a protected route, check if the user is authenticated
  if (isProtectedRoute) {
    const session = await getSession({ req });
    console.log('Session in middleware:', session);

    // 4. If the session is not found or the user is not an admin, redirect them to the login page
    if (!session || session.user.role !== 'ADMIN') {
      console.log('User not authorized or not logged in, redirecting...');
      return NextResponse.redirect(new URL('/login', req.url)); // Redirect to the login page
    }
  }

  // 5. If everything is good, continue with the request
  return NextResponse.next();
}

// 6. Specify which routes this middleware should apply to
export const config = {
  matcher: ['/admin/*', '/admin']
};
