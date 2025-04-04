import { RegisterForm } from '@/features/auth/components/register-form'

export default async function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <RegisterForm />
    </div>
  )
}
