import { Header } from '@/components/layout/header'

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex h-screen flex-col items-center justify-center gap-12">
        <h1 className="text-2xl font-bold">Home page</h1>
      </main>
    </>
  )
}
