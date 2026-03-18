import { prisma } from '@/lib/prisma'
import { Plus, Trash2, Edit2 } from 'lucide-react'
import { revalidatePath } from 'next/cache'

export default async function AdminTestimonios() {
  const testimonios = await prisma.testimony.findMany({
    orderBy: { createdAt: 'desc' }
  })

  async function deleteTestimony(formData: FormData) {
    'use server'
    const id = Number(formData.get('id'))
    if (id) {
      await prisma.testimony.delete({ where: { id } })
      revalidatePath('/')
      revalidatePath('/admin/testimonios')
    }
  }

  async function createTestimony(formData: FormData) {
    'use server'
    await prisma.testimony.create({
      data: {
        nombre: formData.get('nombre') as string,
        cargo: formData.get('cargo') as string,
        empresa: formData.get('empresa') as string,
        texto: formData.get('texto') as string,
        rating: Number(formData.get('rating')) || 5,
      }
    })
    revalidatePath('/')
    revalidatePath('/admin/testimonios')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Testimonios</h1>
          <p className="text-neutral-500 text-sm mt-1">Administra los testimonios de clientes visibles en la home.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-1 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-2xl p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Plus className="w-5 h-5"/> Nuevo Testimonio</h2>
          <form action={createTestimony} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Nombre</label>
              <input required name="nombre" className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border focus:border-neutral-400 border-neutral-200 dark:border-neutral-700 rounded-xl outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Cargo</label>
              <input required name="cargo" className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border focus:border-neutral-400 border-neutral-200 dark:border-neutral-700 rounded-xl outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Empresa</label>
              <input name="empresa" className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border focus:border-neutral-400 border-neutral-200 dark:border-neutral-700 rounded-xl outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Testimonio</label>
              <textarea name="texto" required rows={4} className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border focus:border-neutral-400 border-neutral-200 dark:border-neutral-700 rounded-xl outline-none resize-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Calificación (1-5)</label>
              <select name="rating" className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border focus:border-neutral-400 border-neutral-200 dark:border-neutral-700 rounded-xl outline-none">
                <option value="5">⭐⭐⭐⭐⭐ (5 estrellas)</option>
                <option value="4">⭐⭐⭐⭐ (4 estrellas)</option>
                <option value="3">⭐⭐⭐ (3 estrellas)</option>
                <option value="2">⭐⭐ (2 estrellas)</option>
                <option value="1">⭐ (1 estrella)</option>
              </select>
            </div>
            <button type="submit" className="w-full mt-2 px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black font-medium rounded-xl hover:opacity-90 transition-opacity">
              Agregar Testimonio
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {testimonios.length === 0 ? (
            <div className="p-10 text-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl text-neutral-500">
               No hay testimonios registrados aún.
            </div>
          ) : (
            testimonios.map((t: any) => (
              <div key={t.id} className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <form action={deleteTestimony}>
                    <input type="hidden" name="id" value={t.id} />
                    <button type="submit" className="p-2 text-white bg-red-500 rounded-lg hover:bg-red-600 shadow-md">
                       <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
                
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {t.nombre?.[0] || 'T'}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{t.nombre}</h3>
                    <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">{t.cargo}</p>
                    {t.empresa && <p className="text-xs text-neutral-500">{t.empresa}</p>}
                  </div>
                </div>

                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-3 italic">"{t.texto}"</p>
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                  <span className="text-xs text-neutral-500 ml-2">({t.rating}/5)</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
