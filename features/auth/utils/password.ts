import crypto from 'crypto'

export async function hashPassword(
  password: string,
  salt: string
): Promise<string> {
  const keylen = 64

  return new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, keylen, (error, hash) => {
      if (error) reject(error)

      resolve(hash.toString('hex').normalize())
    })
  })
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
  salt: string
) {
  const hash = await hashPassword(password, salt)

  return crypto.timingSafeEqual(
    Buffer.from(hash, 'hex'),
    Buffer.from(hashedPassword, 'hex')
  )
}

export function generateSalt(): string {
  return crypto.randomBytes(16).toString('hex').normalize()
}
