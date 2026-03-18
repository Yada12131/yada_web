import { jwtVerify, SignJWT } from 'jose'

function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET
  if (!secret || secret.length === 0) {
    throw new Error('The environment variable JWT_SECRET is not set.')
  }
  return secret
}

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecretKey()))
    return verified.payload as { admin: boolean }
  } catch (err) {
    throw new Error('Your token has expired.')
  }
}

export const createToken = async () => {
  return await new SignJWT({ admin: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h') // Set token expiration
    .sign(new TextEncoder().encode(getJwtSecretKey()))
}
