'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'

import { getUserByEmail, storeUser } from './api/user'
import { createSession, deleteSession } from './session'
import { comparePassword, generateSalt, hashPassword } from './utils/password'

const credentialSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function login(_: unknown, formData: FormData) {
  try {
    const { data: form, error } = credentialSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    })

    if (error) return 'Invalid format'

    const user = await getUserByEmail(form.email)

    if (!user) return 'Invalid credentials'

    const isCorrectPassword = await comparePassword(
      form.password,
      user.password,
      user.salt
    )

    if (!isCorrectPassword) return 'Invalid credentials'

    await createSession(user)
  } catch (error) {
    console.error(error)

    return 'Something went wrong'
  }

  redirect('/')
}

export async function register(_: unknown, formData: FormData) {
  try {
    const { data: form, error } = credentialSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    })

    if (error) return 'Invalid format'

    const existingUser = await getUserByEmail(form.email)

    if (existingUser) return 'User already exists'

    const salt = generateSalt()
    const hash = await hashPassword(form.password, salt)

    const user = await storeUser({
      email: form.email,
      password: hash,
      salt,
    })

    await createSession(user)
  } catch (error) {
    console.error(error)

    return 'Something went wrong'
  }

  redirect('/')
}

export async function logout() {
  await deleteSession()

  redirect('/')
}
