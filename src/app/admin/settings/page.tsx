import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export default async function AdminSettings() {
  const settingData = await prisma.setting.findFirst()

  async function updateSetting(formData: FormData) {
    'use server'
    const id = settingData?.id
    
    const data = {
      nombre_sitio: formData.get('nombre_sitio') as string,
    }

    if (id) {
      await prisma.setting.update({ where: { id }, data })
    } else {
      await prisma.setting.create({ data })
    }

    revalidatePath('/admin/settings')
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Configuración General</h1>
      </div>

      <form action={updateSetting} className="bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Nombre del Sitio (SEO / Título Global)</label>
          <input 
            name="nombre_sitio" 
            defaultValue={settingData?.nombre_sitio || ''} 
            className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border fill-neutral-200 border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none" 
          />
        </div>

        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
          <button 
            type="submit" 
            className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            Guardar Configuración
          </button>
        </div>
      </form>
    </div>
  )
}
