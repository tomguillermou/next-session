import { Header } from '@/components/layout/header'
import { getCurrentUser } from '@/features/auth/user'

export default async function Home() {
  const user = await getCurrentUser()

  return (
    <>
      <Header />

      <main className="p-8">
        <h1 className="text-center text-2xl font-bold">Home page</h1>

        {user && <p className="text-center">Welcome, {user.email}</p>}
      </main>
    </>
  )
}
