import { prisma } from '@/lib/prisma'
import { Trash2 } from 'lucide-react'
import { revalidatePath } from 'next/cache'

export default async function AdminContactos() {
  const contactos = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' }
  })

  async function deleteContact(formData: FormData) {
    'use server'
    const id = Number(formData.get('id'))
    if (id) {
      await prisma.contact.delete({ where: { id } })
      revalidatePath('/admin/contactos')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Mensajes de Contacto</h1>
      </div>

      <div className="bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
        {contactos.length === 0 ? (
          <div className="p-10 text-center text-neutral-500">
             No hay mensajes de contacto aún.
          </div>
        ) : (
          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {contactos.map((c: any) => (
              <div key={c.id} className="p-6 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors flex flex-col sm:flex-row gap-4 justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold">{c.name}</h3>
                    <span className="text-neutral-400 text-sm">{c.email}</span>
                  </div>
                  <div className="text-sm font-medium font-mono text-neutral-500 mb-2">Tel: {c.phone} | Servicio: {c.service}</div>
                  <p className="text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800/50 p-4 rounded-xl text-sm italic">
                    "{c.message}"
                  </p>
                </div>
                <div className="flex-shrink-0 pt-2 sm:pt-0">
                   <form action={deleteContact}>
                      <input type="hidden" name="id" value={c.id} />
                      <button type="submit" className="p-2 text-red-500 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-lg transition-colors">
                         <Trash2 className="w-5 h-5" />
                      </button>
                   </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
