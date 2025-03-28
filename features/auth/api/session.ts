import crypto from 'crypto'

import { User, db } from '@/lib/database'

export async function storeSession(user: User, expiresAt: Date) {
  const sessionId = crypto.randomBytes(64).toString('hex').normalize()

  const newSession = await db
    .insertInto('session')
    .values({
      id: sessionId,
      user_id: user.id,
      expires_at: expiresAt,
    })
    .returningAll()
    .executeTakeFirstOrThrow()

  return newSession
}

export async function getSessionById(sessionId: string) {
  const session = await db
    .selectFrom('session')
    .selectAll()
    .where('id', '=', sessionId)
    .where('expires_at', '>', new Date())
    .executeTakeFirst()

  return session || null
}

export async function deleteSessionById(sessionId: string) {
  await db.deleteFrom('session').where('id', '=', sessionId).executeTakeFirst()
}
