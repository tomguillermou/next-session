import { z } from 'zod'

import { db } from '@/lib/database'

const newUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  salt: z.string(),
})

type NewUser = z.infer<typeof newUserSchema>

export async function storeUser(newUser: NewUser) {
  const { error } = newUserSchema.safeParse(newUser)

  if (error) throw Error('Invalid user')

  return db
    .insertInto('user')
    .values(newUser)
    .returningAll()
    .executeTakeFirstOrThrow()
}

export async function getUser(email: string) {
  const user = await db
    .selectFrom('user')
    .selectAll()
    .where('email', '=', email)
    .executeTakeFirst()

  return user || null
}
