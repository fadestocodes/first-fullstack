// middleware.js (in the root or in the app directory)

import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';

export async function middleware(req) {
  console.log('thjis is from middelwar');
  // Only protect routes under /admin
  if (req.url.includes('/admin')) {
    const session = await getSession({ req });
    console.log('middleware session is ', session)

    // If no session or not an admin, redirect to login
    if (!session.data || session.user.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url)); // Or another page (e.g., '/403')
    }
  }

  // Continue with the request if the user is authenticated and authorized
  return NextResponse.next();
}

// Optionally, specify the routes that should apply this middleware
export const config = {
  matcher: '/admin/:path*' // Only apply middleware to /admin routes
};
