import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function NosotrosPage() {
  const about = await prisma.about.findFirst()
  const fundadores = await prisma.founder.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <main className="min-h-screen pt-32 pb-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">{about?.titulo || "Sobre Nosotros"}</h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {about?.descripcion1 || "Conoce más acerca de quiénes somos, qué hacemos y qué nos motiva a trabajar cada día."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mt-16">
          <div className="p-10 bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800">
            <div className="w-14 h-14 bg-black dark:bg-white text-white dark:text-black rounded-2xl flex items-center justify-center font-bold text-2xl mb-6 shadow-lg">M</div>
            <h3 className="text-2xl font-bold mb-4">Nuestra Misión</h3>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg">
              {about?.mision || "Ayudar a las empresas a simplificar y acelerar su proceso de transformación digital a través de software de calidad."}
            </p>
          </div>

          <div className="p-10 bg-gradient-to-br from-neutral-900 to-black text-white rounded-3xl border border-neutral-800 shadow-xl overflow-hidden relative">
            <div className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center font-bold text-2xl mb-6 shadow-lg relative z-10">V</div>
            <h3 className="text-2xl font-bold mb-4 relative z-10">Nuestra Visión</h3>
            <p className="text-neutral-300 leading-relaxed text-lg relative z-10">
              {about?.vision || "Ser la compañía líder global en desarrollo e innovación tecnológica para el mercado hispanohablante."}
            </p>
            {/* Background pattern */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
           <h2 className="text-4xl font-black mb-4">Nuestro Equipo</h2>
           <p className="text-neutral-600 dark:text-neutral-400 text-lg">Las personas detrás de la magia que impulsan Yada todos los días.</p>
        </div>

        {fundadores.length === 0 ? (
          <div className="text-center text-neutral-500 py-10">No hay perfiles de equipo configurados aún.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fundadores.map((f: any) => (
              <div key={f.id} className="group relative bg-white dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 text-center hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="w-24 h-24 mx-auto bg-neutral-200 dark:bg-neutral-800 text-neutral-500 rounded-full flex items-center justify-center text-3xl font-bold mb-6 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                  {f.nombre?.[0]}
                </div>
                <h3 className="text-xl font-bold mb-2">{f.nombre}</h3>
                <p className="text-sm font-semibold text-indigo-500 mb-4 uppercase tracking-wider">{f.cargo}</p>
                {f.phrase && <p className="text-neutral-600 dark:text-neutral-400 italic mb-6">"{f.phrase}"</p>}
                
                {f.linkedin && (
                  <a href={f.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-bold text-black dark:text-white hover:opacity-70 transition-opacity">
                    Conectar en LinkedIn &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
