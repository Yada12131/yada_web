import { Star } from 'lucide-react'

interface Testimonial {
  id: number
  nombre: string | null
  cargo: string | null
  empresa: string | null
  texto: string | null
  foto?: string | null
  rating: number | null
}

interface TestimonialsProps {
  testimonios: Testimonial[]
}

export default function TestimonialsSection({ testimonios }: TestimonialsProps) {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-blue-50/50 to-purple-50/50 dark:from-neutral-950 dark:via-blue-950/20 dark:to-purple-950/20" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            Testimonios
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Lo que dicen nuestros clientes sobre nosotros
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonios.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No hay testimonios registrados aún.
              </p>
            </div>
          ) : (
            testimonios.map((testimonial) => (
              <div
                key={testimonial.id}
                className="group relative bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 rounded-3xl p-8 text-white overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-110 transition-transform" />

                <div className="relative z-10">
                  {/* Rating stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-300 text-yellow-300"
                      />
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <p className="text-lg mb-6 leading-relaxed text-white/95">
                    "{testimonial.texto || 'Testimonio sin contenido'}"
                  </p>

                  {/* Author info */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold flex-shrink-0 overflow-hidden">
                      {testimonial.foto ? (
                        <img
                          src={testimonial.foto}
                          alt={testimonial.nombre || 'Cliente'}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{(testimonial.nombre || 'C').charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{testimonial.nombre || 'Cliente'}</h4>
                      <p className="text-sm text-white/80">{testimonial.cargo || 'Posición'}</p>
                      {testimonial.empresa && (
                        <p className="text-xs text-white/70 mt-1">{testimonial.empresa}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Dots indicator at bottom */}
                <div className="absolute bottom-4 left-8 flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < Math.ceil((testimonial.rating || 5) / 5) * 5
                          ? 'bg-white'
                          : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
