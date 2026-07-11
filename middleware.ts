import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Protect client portal
  if (pathname.startsWith('/client-portal') && pathname !== '/client-portal/login') {
    const token = req.cookies.get('client_token')?.value
    if (!token) return NextResponse.redirect(new URL('/client-portal/login', req.url))
    try {
      await jwtVerify(token, JWT_SECRET)
      return NextResponse.next()
    } catch {
      const res = NextResponse.redirect(new URL('/client-portal/login', req.url))
      res.cookies.set('client_token', '', { maxAge: 0, path: '/' })
      return res
    }
  }

  // Protect admin panel (allow /admin/login and /admin/setup)
  if (
    pathname.startsWith('/admin') &&
    pathname !== '/admin/login' &&
    pathname !== '/admin/setup'
  ) {
    const token = req.cookies.get('admin_token')?.value
    if (!token) return NextResponse.redirect(new URL('/admin/login', req.url))
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET)
      if (payload.role !== 'admin') throw new Error('Not admin')
      return NextResponse.next()
    } catch {
      const res = NextResponse.redirect(new URL('/admin/login', req.url))
      res.cookies.set('admin_token', '', { maxAge: 0, path: '/' })
      return res
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/client-portal/:path*', '/admin/:path*'],
}
