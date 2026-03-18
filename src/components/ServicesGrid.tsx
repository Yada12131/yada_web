import './ServicesGrid.css'

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
    <section className="py-20 bg-white dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Nuestros <span className="text-blue-600">servicios</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">{subtitulo}</p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-16 md:gap-12">
          {servicios.map((servicio, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              {/* Animated Circle Container */}
              <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
                {/* Rotating border circle - the animation wrapper */}
                <div className="service-circle-border absolute inset-0 rounded-full" />
                
                {/* White/Gray background circle */}
                <div className="absolute inset-3 rounded-full bg-gradient-to-b from-gray-100 to-gray-50 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center shadow-md" />
                
                {/* Large number in center */}
                <div className="relative text-6xl font-black text-blue-600 dark:text-blue-400">
                  {idx + 1}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                {servicio.nombre}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed text-center">
                {servicio.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
