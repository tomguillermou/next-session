import Link from 'next/link'

import { LoginButton } from '@/features/auth/components/login-button'
import { LogoutButton } from '@/features/auth/components/logout-button'
import { RegisterButton } from '@/features/auth/components/register-button'
import { getCurrentSession } from '@/features/auth/session'

export async function Header() {
  const session = await getCurrentSession()

  return (
    <header>
      <nav className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">🍪 Next Session</h1>
          <Link href="/">Home</Link>

          {session && <Link href="/private">Private</Link>}
        </div>

        {session && <LogoutButton />}

        {!session && (
          <div className="flex items-center gap-4">
            <LoginButton />
            <RegisterButton />
          </div>
        )}
      </nav>
    </header>
  )
}
