import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

// Opt out of caching for this page so we see fresh data from DB
export const dynamic = 'force-dynamic'

export default async function Home() {
  const homeData = await prisma.home.findFirst()

  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Background gradient blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-[100px] rounded-full pointer-events-none -z-10 dark:from-blue-900/40 dark:to-purple-900/40" />
        
        <div className="text-center max-w-4xl mx-auto z-10 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-sm font-medium mb-8 border border-black/10 dark:border-white/10">
            <span className="w-2 h-2 rounded-full bg-black dark:bg-white animate-pulse" />
            {homeData?.seccion_h1 || "Bienvenidos a Yada"}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-br from-black to-neutral-500 dark:from-white dark:to-neutral-500">
            {homeData?.title_1 || "Construimos el futuro digital."}
          </h1>
          
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            {homeData?.conte_1 || "Diseñamos y desarrollamos soluciones tecnológicas de alto impacto para potenciar el crecimiento de tu negocio."}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/contacto" 
              className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full text-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-2xl dark:shadow-white/20 w-full sm:w-auto justify-center"
            >
              {homeData?.button_cotiza || "Contactar ahora"}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/servicios" 
              className="px-8 py-4 bg-white dark:bg-black text-black dark:text-white border border-neutral-200 dark:border-neutral-800 font-bold rounded-full text-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors w-full sm:w-auto justify-center"
            >
              Ver servicios
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlight */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Por qué elegirnos</h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-8 leading-relaxed">
                Nuestra experiencia técnica combinada con un diseño excepcional resulta en productos que los usuarios aman y que cumplen objetivos de negocio.
              </p>
              <div className="space-y-4">
                {[
                  "Desarrollo ágil e iterativo.", 
                  "Tecnologías de vanguardia (Next.js, React).", 
                  "Diseño centrado en el usuario (UX/UI).", 
                  "Soporte y mantenimiento continuo."
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-black dark:text-white flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-tr from-neutral-200 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 flex items-center justify-center">
                {/* Abstract graphic */}
                <div className="w-3/4 h-3/4 grid grid-cols-2 gap-4">
                  <div className="bg-black/10 dark:bg-white/10 rounded-2xl"></div>
                  <div className="bg-black dark:bg-white rounded-full"></div>
                  <div className="bg-black dark:bg-white rounded-full"></div>
                  <div className="bg-black/10 dark:bg-white/10 rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call To Action */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-black dark:bg-white"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white dark:text-black mb-8 tracking-tight">¿Tienes un proyecto en mente?</h2>
          <Link href="/contacto" className="inline-flex px-10 py-5 bg-white dark:bg-black text-black dark:text-white font-bold rounded-full text-xl hover:scale-105 transition-transform">
            Empezar ahora
          </Link>
        </div>
      </section>
    </main>
  )
}
