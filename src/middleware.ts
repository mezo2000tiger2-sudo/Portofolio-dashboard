import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Helper to decode JWT payload without external library
function decodeJwt(token: string) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = atob(base64)
    return JSON.parse(jsonPayload)
  } catch (e) {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  const refreshToken = request.cookies.get('refresh_token')?.value
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')

  // Helper to clear tokens and redirect to login
  const logout = () => {
    const response = NextResponse.redirect(new URL('/auth/login', request.url))
    response.cookies.delete('auth_token')
    response.cookies.delete('refresh_token')
    return response
  }

  // 1. If no token but we have a refresh token -> try to refresh
  if (!token && refreshToken && !isAuthPage) {
    try {
      const refreshRes = await fetch('https://dummyjson.com/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken, expiresInMins: 60 }),
      })

      if (refreshRes.ok) {
        const data = await refreshRes.json()
        const response = NextResponse.next()
        response.cookies.set('auth_token', data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          path: '/',
          maxAge: 60 * 60,
        })
        return response
      } else {
        return logout()
      }
    } catch (e) {
      return logout()
    }
  }

  // 2. Validate existing token
  if (token) {
    const decoded = decodeJwt(token)
    const isExpired = decoded?.exp ? decoded.exp * 1000 < Date.now() : true

    if (isExpired) {
      // Token is expired, if no refresh token, logout.
      // If there is a refresh token, we can't easily chain a second fetch here without complexity,
      // so we'll delete the expired token and let the next middleware run catch the "no token but refresh token" case.
      const response = NextResponse.redirect(request.url)
      response.cookies.delete('auth_token')
      return response
    }

    if (isAuthPage) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // 3. Protected route check
  if (!token && !refreshToken && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
