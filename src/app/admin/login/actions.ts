'use server'

import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { createToken } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Por favor, ingresa correo y contraseña.' }
  }

  // Find user
  const user = await prisma.user.findUnique({
    where: { email }
  })

  let isValid = false

  if (user) {
     // Verify password
     isValid = await bcrypt.compare(password, user.password)
  }

  // Backup fallback: if no users exist yet and they use a default admin (for first run setup)
  if (!user && email === 'admin@yada.com' && password === 'admin') {
     console.warn("Using fallback admin login. Please create a real user in the database.")
     isValid = true
  }

  if (!isValid) {
    return { error: 'Credenciales inválidas.' }
  }

  // Create token
  const token = await createToken()

  // Set cookie
  cookies().set({
    name: 'admin-token',
    value: token,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 // 24 hours
  })

  return { success: true }
}

export async function logout() {
  cookies().delete('admin-token')
}
