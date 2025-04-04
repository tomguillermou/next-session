'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'

import { getUser, storeUser } from './api/user'
import { createSession, deleteCurrentSession } from './session'
import { comparePassword, generateSalt, hashPassword } from './utils/password'

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export async function login(_: unknown, formData: FormData) {
  try {
    const { data: form, error } = loginSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    })

    if (error) {
      return 'Invalid format'
    }

    const user = await getUser(form.email)

    if (!user) {
      return 'Invalid credentials'
    }

    const isCorrectPassword = await comparePassword(
      form.password,
      user.password,
      user.salt
    )

    if (!isCorrectPassword) {
      return 'Invalid credentials'
    }

    await createSession(user)
  } catch (error) {
    console.error(error)

    return 'Something went wrong'
  }

  redirect('/')
}

const registerSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one digit'),
})

export async function register(_: unknown, formData: FormData) {
  try {
    const { data: form, error } = registerSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    })

    if (error) {
      return error.issues[0].message
    }

    const existingUser = await getUser(form.email)

    if (existingUser) {
      return 'User already exists'
    }

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
  await deleteCurrentSession()

  redirect('/')
}
