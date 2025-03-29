import { LoginButton } from '@/features/auth/components/login-button'
import { LogoutButton } from '@/features/auth/components/logout-button'
import { RegisterButton } from '@/features/auth/components/register-button'
import { getSession } from '@/features/auth/session'

export async function Header() {
  const session = await getSession()

  return (
    <header>
      <nav className="flex items-center justify-between border-b p-4">
        <h1 className="text-2xl font-bold">🍪 Next Session</h1>

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
