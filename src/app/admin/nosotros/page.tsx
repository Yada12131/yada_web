import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export default async function AdminNosotros() {
  const aboutData = await prisma.about.findFirst()

  async function updateAbout(formData: FormData) {
    'use server'
    const id = aboutData?.id
    
    const data = {
      titulo: formData.get('titulo') as string,
      mision: formData.get('mision') as string,
      vision: formData.get('vision') as string,
      descripcion1: formData.get('descripcion1') as string,
    }

    if (id) {
      await prisma.about.update({ where: { id }, data })
    } else {
      await prisma.about.create({ data })
    }

    revalidatePath('/admin/nosotros')
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Nosotros</h1>
      </div>

      <form action={updateAbout} className="bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Título Principal</label>
          <input 
            name="titulo" 
            defaultValue={aboutData?.titulo || ''} 
            className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none" 
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Descripción Principal</label>
          <textarea 
            name="descripcion1" 
            rows={4}
            defaultValue={aboutData?.descripcion1 || ''} 
            className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none" 
          />
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Misión</label>
            <textarea 
              name="mision" 
              rows={4}
              defaultValue={aboutData?.mision || ''} 
              className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Visión</label>
            <textarea 
              name="vision" 
              rows={4}
              defaultValue={aboutData?.vision || ''} 
              className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none" 
            />
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
          <button 
            type="submit" 
            className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  )
}
