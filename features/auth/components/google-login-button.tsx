import Image from 'next/image'

import { Button } from '@/components/ui/button'

import { loginGoogle } from '../actions'

export function GoogleLoginButton() {
  return (
    <form action={loginGoogle}>
      <Button variant="outline" className="w-full" type="submit">
        <Image
          src="google-icon.svg"
          alt="Google Icon"
          className="mr-2"
          width={20}
          height={20}
        />
        Login with Google
      </Button>
    </form>
  )
}
