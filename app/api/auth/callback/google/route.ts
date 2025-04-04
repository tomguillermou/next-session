import { NextRequest, NextResponse } from 'next/server'

import { getUserByEmail, storeUser } from '@/features/auth/api/user'
import { getGoogleToken, getGoogleUser } from '@/features/auth/google'
import { createSession } from '@/features/auth/session'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const { access_token } = await getGoogleToken(code)

  const googleUser = await getGoogleUser(access_token)

  let user = await getUserByEmail(googleUser.email)

  if (!user) {
    user = await storeUser({
      email: googleUser.email,
      name: googleUser.name,
      access_token,
    })
  }

  await createSession(user)

  return NextResponse.redirect(new URL('/', request.url))
}
