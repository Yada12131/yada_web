import { Activity, LayoutDashboard } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
          <LayoutDashboard className="w-6 h-6 text-neutral-900 dark:text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard General</h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">Resumen del contenido y estado del sitio web</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Placeholder Stat Cards */}
        {[
          { name: "Visitas Hoy", stat: "1,200", icon: Activity },
          { name: "Mensajes Recibidos", stat: "12", icon: Activity },
          { name: "Servicios Activos", stat: "5", icon: Activity },
          { name: "Planes de Precios", stat: "3", icon: Activity },
        ].map((item) => (
          <div key={item.name} className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{item.name}</p>
                <p className="mt-2 text-3xl font-bold">{item.stat}</p>
              </div>
              <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                 <item.icon className="w-5 h-5 text-neutral-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
               <span className="text-green-500 font-medium">↑ 12%</span>
               <span className="ml-2 text-neutral-500">vs la semana pasada</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-8 rounded-2xl bg-gradient-to-br from-neutral-900 to-black text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl font-bold mb-2">¡Bienvenido al nuevo panel de control Yada!</h2>
          <p className="text-neutral-300 mb-6">Hemos migrado la plataforma a Next.js para brindarte la mejor experiencia de usuario y velocidad insuperable. Empieza administrando el contenido de tu sitio en el menú izquierdo.</p>
        </div>
        <div className="absolute right-0 bottom-0 pointer-events-none opacity-10">
           <Activity className="w-64 h-64 -mb-10 -mr-10" />
        </div>
      </div>
    </div>
  )
}
