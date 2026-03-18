'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function submitContact(formData: FormData) {
  try {
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      service: formData.get('service') as string,
      message: formData.get('message') as string,
    }

    await prisma.contact.create({ data })
    
    // Invalidate the admin contacts path so it updates instantly
    revalidatePath('/admin/contactos')

    return { success: true }
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return { success: false, error: 'Ocurrió un error al enviar el mensaje. Intenta nuevamente.' }
  }
}
