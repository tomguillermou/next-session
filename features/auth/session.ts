import { cookies } from 'next/headers'

import { User } from '@/lib/database'

import { deleteSession, getSession, storeSession } from './api/session'

const SESSION_COOKIE_KEY = 'session'
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7 // 7 days

export async function createSession(user: User) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS)

  const cookieStore = await cookies()

  const session = await storeSession(user, expiresAt)

  cookieStore.set(SESSION_COOKIE_KEY, session.id, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
    expires: session.expires_at,
  })
}

export async function getCurrentSession() {
  const now = new Date()

  const cookieStore = await cookies()
  const sessionId = cookieStore.get(SESSION_COOKIE_KEY)?.value

  if (!sessionId) {
    return null
  }

  const session = await getSession(sessionId)

  if (!session || now > session.expires_at) {
    return null
  }

  return session
}

export async function deleteCurrentSession() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get(SESSION_COOKIE_KEY)?.value

  if (!sessionId) {
    return
  }

  await deleteSession(sessionId)

  cookieStore.delete(SESSION_COOKIE_KEY)
}
