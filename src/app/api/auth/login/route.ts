import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 60, // accessToken expires in 1 hour
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json({ message: error.message || 'Login failed' }, { status: response.status })
    }

    const data = await response.json()
    const { accessToken, refreshToken, ...user } = data

    const cookieStore = await cookies()

    // Set Access Token (Secure, HttpOnly)
    cookieStore.set('auth_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60, // 1 hour
    })

    // Set Refresh Token (Secure, HttpOnly)
    cookieStore.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    // Return only non-sensitive display fields
    const safeUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      image: user.image,
      email: user.email
    }

    return NextResponse.json(safeUser)
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
