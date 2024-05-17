import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  const signInUrl = new URL('/sign-in', request.url)
  const baseUrl = new URL('/', request.url)

  if (!token) {
    if (request.nextUrl.pathname === '/sign-in') {
      return NextResponse.next()
    }

    return NextResponse.redirect(signInUrl)
  }

  if (request.nextUrl.pathname === '/sign-in') {
    return NextResponse.redirect(baseUrl)
  }
}

export const config = {
  matcher: ['/sign-in', '/app/:path*'],
}
