import { LoginForm } from '@/features/auth/components/login-form'

export default async function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}
