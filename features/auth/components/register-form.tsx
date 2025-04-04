'use client'

import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useActionState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { register } from '../actions'

export function RegisterForm() {
  const [error, formAction, pending] = useActionState(register, undefined)

  return (
    <div className="grid w-full max-w-md gap-4">
      <Link href="/" className="text-center text-2xl font-bold">
        🏠 Home
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="grid gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                required
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full" disabled={pending}>
              {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Register
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
