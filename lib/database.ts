import { Generated, Kysely, PostgresDialect, Selectable } from 'kysely'
import { Pool } from 'pg'

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool,
  }),
})

interface Database {
  user: UserTable
  session: SessionTable
}

/**
 * Users
 */
interface UserTable {
  id: Generated<number>
  email: string
  password: string
  salt: string
  created_at: Generated<Date>
}

export type User = Selectable<UserTable>

/**
 * Session
 */
interface SessionTable {
  id: string
  user_id: number
  expires_at: Date
  created_at: Generated<Date>
}

export type Session = Selectable<SessionTable>
