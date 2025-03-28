import { Navbar } from '@/components/layout/navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex h-screen flex-col items-center justify-center gap-12">
        <h1 className="text-2xl font-bold">Home page</h1>
      </main>
    </>
  )
}
