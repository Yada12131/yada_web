import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export default async function AdminIntro() {
  const introData = await prisma.intro.findFirst()

  async function updateIntro(formData: FormData) {
    'use server'
    const id = introData?.id

    const data = {
      titulo: formData.get('titulo') as string,
      subtitulo: formData.get('subtitulo') as string,
      descripcion: formData.get('descripcion') as string,
    }

    if (id) {
      await prisma.intro.update({ where: { id }, data })
    } else {
      await prisma.intro.create({ data })
    }

    revalidatePath('/')
    revalidatePath('/admin/intro')
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sección Intro</h1>
          <p className="text-neutral-500 text-sm mt-1">Edita la sección de introducción "¡Hola! Somos YADA CREACIONES"</p>
        </div>
      </div>

      <form action={updateIntro} className="bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Título Principal</label>
          <input 
            name="titulo" 
            defaultValue={introData?.titulo || '¡Hola! Somos YADA CREACIONES'}
            className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none" 
          />
          <p className="text-xs text-neutral-500">Encabezado principal de la sección</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Subtítulo</label>
          <input 
            name="subtitulo" 
            defaultValue={introData?.subtitulo || 'Nuestro equipo está listo'}
            className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none" 
          />
          <p className="text-xs text-neutral-500">Pequeño texto descriptivo</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Descripción (Contenido principal)</label>
          <textarea 
            name="descripcion" 
            defaultValue={introData?.descripcion || 'Una empresa enfocada en dar soluciones a la medida para profesionales que requieran impulsar su negocio a otro nivel. Aceptamos requerimientos en las versiones de lenguaje y aunque que somos totalmente flexibles en nuestro desempeño de trabajo. No satisface colaborar con nuestros clientes.'}
            rows={5}
            className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none resize-none" 
          />
          <p className="text-xs text-neutral-500">Texto descriptivo largo de la sección</p>
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
