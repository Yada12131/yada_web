import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { Plus, Trash2, Edit } from 'lucide-react'

export default async function AdminServicios() {
  const servicios = await prisma.service.findMany({
    orderBy: { createdAt: 'desc' }
  })

  async function deleteService(formData: FormData) {
    'use server'
    const id = Number(formData.get('id'))
    if (id) {
      await prisma.service.delete({ where: { id } })
      revalidatePath('/admin/servicios')
    }
  }

  async function createService(formData: FormData) {
    'use server'
    await prisma.service.create({
      data: {
        encabezado: formData.get('encabezado') as string,
        descripcion: formData.get('descripcion') as string,
        nombre_servicio_1: formData.get('nombre_servicio_1') as string,
      }
    })
    revalidatePath('/admin/servicios')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Servicios</h1>
          <p className="text-neutral-500 text-sm mt-1">Administra los servicios ofrecidos en el sitio.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Form to add service */}
        <div className="lg:col-span-1 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-2xl p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Plus className="w-5 h-5"/> Nuevo Servicio</h2>
          <form action={createService} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Encabezado</label>
              <input required name="encabezado" className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border fill-neutral-200 border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Descripción Breve</label>
              <textarea name="descripcion" rows={3} className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border fill-neutral-200 border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Servicio Principal (1)</label>
              <input name="nombre_servicio_1" className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border fill-neutral-200 border-neutral-200 dark:border-neutral-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white transition-all outline-none" />
            </div>
            <button type="submit" className="w-full mt-2 px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black font-medium rounded-xl hover:opacity-90 transition-opacity">
              Agregar Servicio
            </button>
          </form>
        </div>

        {/* List of services */}
        <div className="lg:col-span-2 space-y-4">
          {servicios.length === 0 ? (
            <div className="p-10 text-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl text-neutral-500">
               No hay servicios registrados aún.
            </div>
          ) : (
            servicios.map((srv: any) => (
              <div key={srv.id} className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex justify-between items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <h3 className="font-bold text-lg">{srv.encabezado || 'Sin Encabezado'}</h3>
                  <p className="text-neutral-500 text-sm mt-1">{srv.descripcion}</p>
                  {srv.nombre_servicio_1 && (
                     <div className="mt-3 inline-block px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold rounded-lg">
                       {srv.nombre_servicio_1}
                     </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <form action={deleteService}>
                    <input type="hidden" name="id" value={srv.id} />
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
