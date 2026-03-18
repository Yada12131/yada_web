import { ReactNode } from 'react'

interface IntroSectionProps {
  titulo: string
  subtitulo: string
  contenido: string
  children?: ReactNode
}

export default function IntroSection({
  titulo,
  subtitulo,
  contenido,
  children,
}: IntroSectionProps) {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-20 right-0 w-96 h-96 bg-gradient-to-b from-purple-500/20 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-full mb-6">
            <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {subtitulo}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900 dark:text-white">
            {titulo}
          </h2>

          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            {contenido}
          </p>

          {children}
        </div>
      </div>
    </section>
  )
}
