import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Define protected routes (require authentication)
const isProtectedRoute = createRouteMatcher(['/dashboard'])

// Define auth routes (login/signup pages)
const isAuthRoute = createRouteMatcher(['/auth', '/auth/sign-up'])

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth()

  // Redirect root URL to dashboard
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If user is logged in and tries to access auth pages
  if (userId && isAuthRoute(request)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If user is not logged in and tries to access protected routes
  if (!userId && isProtectedRoute(request)) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
