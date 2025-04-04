import { redirect } from 'next/navigation'

import { Header } from '@/components/layout/header'
import { getCurrentSession } from '@/features/auth/session'

export default async function Page() {
  const session = await getCurrentSession()

  if (!session) {
    redirect('/')
  }

  return (
    <>
      <Header />

      <main className="p-8 text-center">
        <h1 className="text-2xl font-bold">Private page</h1>
        <p>It should only be accessible by an authenticated user</p>
      </main>
    </>
  )
}
