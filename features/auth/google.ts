import { z } from 'zod'

export async function getGoogleAuthUrl() {
  const url = new URL('https://accounts.google.com/o/oauth2/v2/auth')

  url.searchParams.set('client_id', process.env.GOOGLE_CLIENT_ID!)
  url.searchParams.set('redirect_uri', process.env.GOOGLE_REDIRECT_URI!)
  url.searchParams.set('scope', 'profile email')
  url.searchParams.set('response_type', 'code')

  return url.toString()
}

const googleTokenSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  refresh_token: z.string().optional(),
  scope: z.string(),
  token_type: z.string(),
  id_token: z.string(),
})

export async function getGoogleToken(code: string) {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      grant_type: 'authorization_code',
    }),
  })

  const data = await response.json()

  return googleTokenSchema.parse(data)
}

const googleUserSchema = z.object({
  sub: z.string(),
  name: z.string(),
  given_name: z.string(),
  family_name: z.string().optional(),
  picture: z.string().url(),
  email: z.string().email(),
  email_verified: z.boolean(),
  locale: z.string().optional(),
})

export async function getGoogleUser(access_token: string) {
  const response = await fetch(
    'https://www.googleapis.com/oauth2/v3/userinfo',
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  )

  const data = await response.json()

  return googleUserSchema.parse(data)
}
