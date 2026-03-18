import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export default async function AdminHome() {
  const homeData = await prisma.home.findFirst()

  async function updateHome(formData: FormData) {
    'use server'
    const id = homeData?.id
    
    const data = {
      seccion_h1: formData.get('seccion_h1') as string,
      title_1: formData.get('title_1') as string,
      conte_1: formData.get('conte_1') as string,
      button_cotiza: formData.get('button_cotiza') as string,
    }

    if (id) {
      await prisma.home.update({ where: { id }, data })
    } else {
      await prisma.home.create({ data })
    }

    revalidatePath('/admin/home')
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Inicio (Home) Settings</h1>
      </div>

      <form action={updateHome} className="bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
        
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Sección H1</label>
            <input 
              name="seccion_h1" 
              defaultValue={homeData?.seccion_h1 || ''} 
              className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border fill-neutral-200 border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Título Principal (Title 1)</label>
            <input 
              name="title_1" 
              defaultValue={homeData?.title_1 || ''} 
              className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none" 
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium">Contenido 1</label>
            <textarea 
              name="conte_1" 
              rows={4}
              defaultValue={homeData?.conte_1 || ''} 
              className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Texto del botón cotiza</label>
            <input 
              name="button_cotiza" 
              defaultValue={homeData?.button_cotiza || ''} 
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
