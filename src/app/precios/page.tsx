import { prisma } from '@/lib/prisma'
import { Check } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function PreciosPage() {
  const precios = await prisma.pricing.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main className="min-h-screen pt-32 pb-24">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">Planes y Precios</h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto border-b border-transparent">
          Precios transparentes y escalables. Comienza hoy mismo y paga a medida que tu negocio crece y demande más recursos.
        </p>
      </section>

      {/* Pricing Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {precios.length === 0 ? (
          <div className="text-center text-neutral-500 py-20 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl">
            Aún no hay planes de precios configurados.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {precios.map((plan: any, index: number) => {
              // Parse features if they are comma separated (simple approach)
              const featuresList = plan.descripcion1 ? plan.descripcion1.split(',').map((f: string) => f.trim()) : []
              
              // Emphasize the second plan (usually "Pro")
              const isPopular = index === 1

              return (
                <div 
                  key={plan.id} 
                  className={`relative flex flex-col bg-white dark:bg-neutral-900 rounded-3xl p-8 transition-transform hover:-translate-y-2 ${
                    isPopular 
                      ? 'border-2 border-black dark:border-white shadow-2xl scale-105 z-10' 
                      : 'border border-neutral-200 dark:border-neutral-800 shadow-md'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black dark:bg-white text-white dark:text-black px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase">
                      Más Popular
                    </div>
                  )}

                  <div className="mb-8 border-b border-neutral-100 dark:border-neutral-800 pb-8">
                    <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-2">{plan.gategoria1 || 'Plan'}</p>
                    <h3 className="text-3xl font-black mb-4">{plan.plan1 || 'Básico'}</h3>
                    <p className="text-neutral-500 text-sm mb-6 min-h-[40px]">{plan.descripcion || 'Plan ideal para arrancar de la mejor manera.'}</p>
                    <div className="flex items-baseline">
                      <span className="text-5xl font-black">${plan.valor1 || '0'}</span>
                      <span className="text-neutral-500 ml-2 font-medium">/ mes</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8 flex-1">
                    {featuresList.length > 0 ? (
                      featuresList.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isPopular ? 'text-black dark:text-white' : 'text-neutral-400'}`} />
                          <span className={`${isPopular ? 'font-medium' : 'text-neutral-600 dark:text-neutral-400'}`}>{feature}</span>
                        </li>
                      ))
                    ) : (
                      <li className="flex items-start gap-3 text-neutral-500">
                        Incluye soporte básico.
                      </li>
                    )}
                  </ul>

                  <Link 
                    href="/contacto" 
                    className={`block w-full text-center py-4 rounded-xl font-bold mt-auto transition-colors ${
                      isPopular 
                        ? 'bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200' 
                        : 'bg-neutral-100 text-black hover:bg-neutral-200 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700'
                    }`}
                  >
                    Seleccionar Plan
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </main>
  )
}
