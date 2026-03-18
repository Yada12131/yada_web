import { prisma } from '@/lib/prisma'
import { Plus, Trash2 } from 'lucide-react'
import { revalidatePath } from 'next/cache'

export default async function AdminPrecios() {
  const precios = await prisma.pricing.findMany({
    orderBy: { createdAt: 'desc' }
  })

  async function deletePricing(formData: FormData) {
    'use server'
    const id = Number(formData.get('id'))
    if (id) {
      await prisma.pricing.delete({ where: { id } })
      revalidatePath('/admin/precios')
    }
  }

  async function createPricing(formData: FormData) {
    'use server'
    await prisma.pricing.create({
      data: {
        gategoria1: formData.get('gategoria1') as string,
        descripcion: formData.get('descripcion') as string,
        plan1: formData.get('plan1') as string,
        valor1: formData.get('valor1') as string,
        descripcion1: formData.get('descripcion1') as string,
      }
    })
    revalidatePath('/admin/precios')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Planes de Precios</h1>
          <p className="text-neutral-500 text-sm mt-1">Administra los planes de suscripción o pago.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-1 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-2xl p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Plus className="w-5 h-5"/> Nuevo Plan</h2>
          <form action={createPricing} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Categoría / Título General</label>
              <input required name="gategoria1" className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border focus:border-neutral-400 border-neutral-200 dark:border-neutral-700 rounded-xl outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Descripción Breve</label>
              <textarea name="descripcion" rows={2} className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border focus:border-neutral-400 border-neutral-200 dark:border-neutral-700 rounded-xl outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Nombre del Plan 1</label>
              <input required name="plan1" className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border focus:border-neutral-400 border-neutral-200 dark:border-neutral-700 rounded-xl outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Valor del Plan 1 ($)</label>
              <input required name="valor1" className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border focus:border-neutral-400 border-neutral-200 dark:border-neutral-700 rounded-xl outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Características (Desc 1)</label>
              <textarea name="descripcion1" rows={3} placeholder="Feature 1, Feature 2..." className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border focus:border-neutral-400 border-neutral-200 dark:border-neutral-700 rounded-xl outline-none" />
            </div>
            <button type="submit" className="w-full mt-2 px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black font-medium rounded-xl hover:opacity-90 transition-opacity">
              Agregar Plan
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {precios.length === 0 ? (
            <div className="p-10 text-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl text-neutral-500">
               No hay planes registrados aún.
            </div>
          ) : (
            precios.map((p: any) => (
              <div key={p.id} className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex justify-between items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-bold text-xl">{p.plan1 || 'Sin Nombre'} <span className="text-emerald-500 font-mono ml-2">${p.valor1}</span></h3>
                  <p className="text-neutral-400 text-sm font-medium mt-1 uppercase tracking-wider">{p.gategoria1}</p>
                  <p className="text-neutral-500 text-sm mt-3">{p.descripcion1}</p>
                </div>
                <div className="flex gap-2">
                  <form action={deletePricing}>
                    <input type="hidden" name="id" value={p.id} />
                    <button type="submit" className="p-2 text-red-500 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-lg transition-colors">
                       <Trash2 className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}
