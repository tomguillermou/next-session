import { getUserById } from './api/user'
import { getCurrentSession } from './session'

export async function getCurrentUser() {
  const session = await getCurrentSession()

  if (!session) {
    return null
  }

  return getUserById(session.user_id)
}
