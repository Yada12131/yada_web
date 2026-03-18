interface ServiceItem {
  nombre: string
  descripcion: string
}

interface ServicesGridProps {
  titulo: string
  subtitulo: string
  servicios: ServiceItem[]
}

export default function ServicesGrid({
  titulo,
  subtitulo,
  servicios,
}: ServicesGridProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-neutral-900 dark:to-neutral-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            {titulo}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">{subtitulo}</p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {servicios.map((servicio, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              {/* Circular background with partial border */}
              <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
                {/* Animated border circle */}
                <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-blue-500 border-r-purple-500 opacity-60 group-hover:opacity-100 transition-opacity" />
                {/* Gradient circle */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gray-200 to-gray-100 dark:from-neutral-700 dark:to-neutral-800" />
                {/* Inner circle with icon */}
                <div className="relative w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {idx + 1}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {servicio.nombre}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {servicio.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
