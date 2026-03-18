import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAuth } from './lib/auth'

export async function middleware(request: NextRequest) {
  // Check if we're accessing an admin route (excluding login)
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('admin-token')?.value

    if (!token) {
      // No token at all, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    try {
      // Verify token
      const verifiedToken = await verifyAuth(token)
      if (!verifiedToken) {
        throw new Error('Invalid token')
      }
      return NextResponse.next()
    } catch (err) {
      // Token exists but is invalid/expired
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
