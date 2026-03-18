interface TeamMember {
  id: number
  nombre: string | null
  cargo: string | null
  phrase: string | null
  foto?: string | null
}

interface TeamSectionProps {
  titulo: string
  descripcion: string
  equipo: TeamMember[]
}

export default function TeamSection({
  titulo,
  descripcion,
  equipo,
}: TeamSectionProps) {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-t from-blue-500/10 to-transparent blur-3xl rounded-full" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-l from-purple-500/10 to-transparent blur-3xl rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
            {titulo}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            {descripcion}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipo.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No hay miembros del equipo registrados aún.
              </p>
            </div>
          ) : (
            equipo.map((member) => (
              <div
                key={member.id}
                className="group relative bg-white dark:bg-neutral-800 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-neutral-700"
              >
                {/* Background accent */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-full blur-2xl group-hover:scale-125 transition-transform" />

                {/* Photo/Avatar */}
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold overflow-hidden relative z-10">
                  {member.foto ? (
                    <img
                      src={member.foto}
                      alt={member.nombre || 'Miembro del equipo'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{(member.nombre || 'M').charAt(0)}</span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-1">
                  {member.nombre || 'Miembro del equipo'}
                </h3>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 text-center mb-4">
                  {member.cargo || 'Posición'}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm text-center italic border-l-2 border-blue-500/50 pl-3">
                  "{member.phrase || 'Bienvenido al equipo'}"
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
