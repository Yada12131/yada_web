import Link from 'next/link'

interface CTASectionProps {
  titulo: string
  descripcion: string
  boton_texto: string
  boton_link: string
}

export default function CTASection({
  titulo,
  descripcion,
  boton_texto,
  boton_link,
}: CTASectionProps) {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600" />
      <div className="absolute inset-0 -z-10 opacity-50">
        <div className="absolute -top-20 left-1/4 w-96 h-96 bg-blue-500/30 blur-3xl rounded-full" />
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-pink-500/20 blur-3xl rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
          {titulo}
        </h2>

        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          {descripcion}
        </p>

        <Link
          href={boton_link}
          className="inline-flex px-10 py-4 bg-cyan-400 hover:bg-cyan-300 text-gray-900 font-bold rounded-full text-lg transition-all hover:scale-105 shadow-xl"
        >
          {boton_texto}
        </Link>
      </div>
    </section>
  )
}
