import { prisma } from '@/lib/prisma'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ServiciosPage() {
  const servicios = await prisma.service.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main className="min-h-screen pt-32 pb-24">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">Nuestros Servicios</h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed mb-10">
          Ofrecemos un conjunto integral de soluciones tecnológicas diseñadas para llevar tu negocio al siguiente nivel operativo y comercial.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {servicios.length === 0 ? (
          <div className="text-center text-neutral-500 py-20 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl">
            Aún no hay servicios configurados.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicios.map((srv: any, index: number) => (
              <div key={srv.id} className="group flex flex-col justify-between bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 hover:shadow-2xl hover:border-black dark:hover:border-white transition-all">
                <div>
                  <div className="w-14 h-14 bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white rounded-2xl flex items-center justify-center font-bold text-xl mb-6 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                    {index + 1}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{srv.encabezado || "Servicio"}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                    {srv.descripcion || "Descripción detallada del servicio y el impacto que generará en tu negocio."}
                  </p>

                  {/* Feature Lists */}
                  <ul className="space-y-3 mb-8">
                    {srv.nombre_servicio_1 && (
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-neutral-400 mt-0.5" />
                        <span className="text-sm font-medium">{srv.nombre_servicio_1}</span>
                      </li>
                    )}
                    {srv.nombre_servicio_2 && (
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-neutral-400 mt-0.5" />
                        <span className="text-sm font-medium">{srv.nombre_servicio_2}</span>
                      </li>
                    )}
                    {srv.nombre_servicio_3 && (
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-neutral-400 mt-0.5" />
                        <span className="text-sm font-medium">{srv.nombre_servicio_3}</span>
                      </li>
                    )}
                  </ul>
                </div>

                <Link href={srv.url_boton || "/contacto"} className="inline-flex items-center gap-2 font-bold text-black dark:text-white group-hover:gap-3 transition-all mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  Saber más <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 text-center">
        <div className="bg-black dark:bg-white text-white dark:text-black rounded-3xl p-12 md:p-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">¿No encuentras lo que buscas?</h2>
          <p className="text-neutral-400 dark:text-neutral-600 text-lg mb-8">
            Podemos desarrollar soluciones a medida para necesidades específicas. Contáctanos y hablemos sobre tu proyecto.
          </p>
          <Link href="/contacto" className="inline-block px-8 py-4 bg-white dark:bg-black text-black dark:text-white font-bold rounded-full hover:scale-105 transition-transform">
            Contactar a ventas
          </Link>
        </div>
      </section>
    </main>
  )
}
