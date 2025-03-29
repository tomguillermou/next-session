'use server'

import { cookies } from 'next/headers'
import { cache } from 'react'

import { User } from '@/lib/database'

import { deleteSessionById, getSessionById, storeSession } from './api/session'

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

export const getSession = cache(async () => {
  const now = new Date()
  const cookieStore = await cookies()
  const sessionId = cookieStore.get(SESSION_COOKIE_KEY)?.value

  if (!sessionId) return null

  const session = await getSessionById(sessionId)
  const isInvalidSession = !session || now > session.expires_at

  if (isInvalidSession) return null

  return session
})

export async function deleteSession() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get(SESSION_COOKIE_KEY)?.value

  if (!sessionId) return

  await deleteSessionById(sessionId)

  cookieStore.delete(SESSION_COOKIE_KEY)
}
