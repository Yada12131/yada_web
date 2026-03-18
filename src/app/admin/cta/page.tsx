import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export default async function AdminCTA() {
  const ctaData = await prisma.cTA.findFirst()

  async function updateCTA(formData: FormData) {
    'use server'
    const id = ctaData?.id

    const data = {
      titulo: formData.get('titulo') as string,
      descripcion: formData.get('descripcion') as string,
      boton_texto: formData.get('boton_texto') as string,
      boton_link: formData.get('boton_link') as string,
    }

    if (id) {
      await prisma.cTA.update({ where: { id }, data })
    } else {
      await prisma.cTA.create({ data })
    }

    revalidatePath('/')
    revalidatePath('/admin/cta')
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sección CTA</h1>
          <p className="text-neutral-500 text-sm mt-1">Edita la sección "¿Quieres cotizar tu proyecto?"</p>
        </div>
      </div>

      <form action={updateCTA} className="bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Título</label>
          <input 
            name="titulo" 
            defaultValue={ctaData?.titulo || '¿Quieres cotizar tu proyecto con nosotros?'}
            className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none" 
          />
          <p className="text-xs text-neutral-500">Encabezado de la sección</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Descripción</label>
          <textarea 
            name="descripcion" 
            defaultValue={ctaData?.descripcion || 'En YADA creemos que la innovación y la experiencia del usuario son clave. Cuéntanos sobre tu proyecto y te asesoraremos sobre la mejor forma de trabajar con nosotros para tu plan de negocio.'}
            rows={4}
            className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none resize-none" 
          />
          <p className="text-xs text-neutral-500">Texto descriptivo de la sección</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Texto del Botón</label>
            <input 
              name="boton_texto" 
              defaultValue={ctaData?.boton_texto || 'Contáctanos'}
              className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none" 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Link del Botón</label>
            <input 
              name="boton_link" 
              defaultValue={ctaData?.boton_link || '/contacto'}
              className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none" 
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  )
}
