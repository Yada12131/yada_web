import { prisma } from '@/lib/prisma'
import { Plus, Trash2 } from 'lucide-react'
import { revalidatePath } from 'next/cache'

export default async function AdminFundadores() {
  const fundadores = await prisma.founder.findMany({
    orderBy: { createdAt: 'desc' }
  })

  async function deleteFounder(formData: FormData) {
    'use server'
    const id = Number(formData.get('id'))
    if (id) {
      await prisma.founder.delete({ where: { id } })
      revalidatePath('/admin/fundadores')
    }
  }

  async function createFounder(formData: FormData) {
    'use server'
    await prisma.founder.create({
      data: {
        nombre: formData.get('nombre') as string,
        cargo: formData.get('cargo') as string,
        phrase: formData.get('phrase') as string,
        linkedin: formData.get('linkedin') as string,
      }
    })
    revalidatePath('/admin/fundadores')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Equipo / Fundadores</h1>
          <p className="text-neutral-500 text-sm mt-1">Administra los perfiles del equipo visible en la web.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-1 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-2xl p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Plus className="w-5 h-5"/> Nuevo Perfil</h2>
          <form action={createFounder} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Nombre</label>
              <input required name="nombre" className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border focus:border-neutral-400 border-neutral-200 dark:border-neutral-700 rounded-xl outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Cargo</label>
              <input required name="cargo" className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border focus:border-neutral-400 border-neutral-200 dark:border-neutral-700 rounded-xl outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Frase Cita</label>
              <textarea name="phrase" rows={3} className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border focus:border-neutral-400 border-neutral-200 dark:border-neutral-700 rounded-xl outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">URL LinkedIn</label>
              <input name="linkedin" className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border focus:border-neutral-400 border-neutral-200 dark:border-neutral-700 rounded-xl outline-none" />
            </div>
            <button type="submit" className="w-full mt-2 px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black font-medium rounded-xl hover:opacity-90 transition-opacity">
              Agregar Perfil
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fundadores.length === 0 ? (
            <div className="p-10 text-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl text-neutral-500 sm:col-span-2">
               No hay miembros de equipo registrados aún.
            </div>
          ) : (
            fundadores.map((f: any) => (
              <div key={f.id} className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <form action={deleteFounder}>
                    <input type="hidden" name="id" value={f.id} />
                    <button type="submit" className="p-2 text-white bg-red-500 rounded-lg hover:bg-red-600 shadow-md">
                       <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
                
                <div className="w-16 h-16 bg-neutral-200 dark:bg-neutral-800 rounded-full mb-4 flex items-center justify-center overflow-hidden text-2xl font-bold text-neutral-400">
                  {f.nombre?.[0] || 'U'}
                </div>
                <h3 className="font-bold text-lg">{f.nombre}</h3>
                <p className="text-indigo-500 dark:text-indigo-400 text-sm font-medium mb-3">{f.cargo}</p>
                {f.phrase && <p className="text-neutral-500 text-sm italic border-l-2 border-neutral-300 dark:border-neutral-700 pl-3">"{f.phrase}"</p>}
                {f.linkedin && (
                  <a href={f.linkedin} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline mt-4 inline-block font-medium">
                    Ver LinkedIn
                  </a>
                )}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}
