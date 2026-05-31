import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const NEXT_AUTH_COOKIE_NAMES = [
  'next-auth.session-token',
  '__Secure-next-auth.session-token',
  'next-auth.callback-url',
  '__Secure-next-auth.callback-url',
  'next-auth.csrf-token',
  '__Host-next-auth.csrf-token',
]

export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/login', request.url))

  NEXT_AUTH_COOKIE_NAMES.forEach((name) => {
    response.cookies.set(name, '', {
      expires: new Date(0),
      maxAge: 0,
      path: '/',
      secure: name.startsWith('__Secure-') || name.startsWith('__Host-'),
    })
  })

  return response
}
