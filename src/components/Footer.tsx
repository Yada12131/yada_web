'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Instagram, MessageCircle, ArrowRight } from 'lucide-react'

export default function Footer() {
  const pathname = usePathname()

  // Don't show public footer on admin routes
  if (pathname?.startsWith('/admin')) {
    return null
  }

  const colorPalette = [
    'bg-blue-600',
    'bg-cyan-400',
    'bg-indigo-600',
    'bg-purple-600',
    'bg-violet-600',
    'bg-fuchsia-600',
  ]

  return (
    <footer className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white pt-20 pb-10 px-4 sm:px-6 lg:px-8 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg" />
                <svg className="w-7 h-7 text-white relative z-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 10L85 90H15L50 10Z" fill="currentColor" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tighter">
                YADA
              </span>
            </Link>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">
              Transformamos ideas en experiencias digitales excepcionales. Soluciones innovadoras para tu negocio.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all hover:scale-110">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold mb-6 text-lg text-neutral-900 dark:text-white">Navegación</h4>
            <ul className="space-y-4 text-neutral-600 dark:text-neutral-400 text-sm">
              <li><Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Inicio</Link></li>
              <li><Link href="/nosotros" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Quiénes Somos</Link></li>
              <li><Link href="/servicios" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Servicios</Link></li>
              <li><Link href="/precios" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Planes</Link></li>
              <li><Link href="/contacto" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Contacto</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-6 text-lg text-neutral-900 dark:text-white">Servicios</h4>
            <ul className="space-y-4 text-neutral-600 dark:text-neutral-400 text-sm">
              <li><a href="/servicios" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Desarrollo Web</a></li>
              <li><a href="/servicios" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Diseño Digital</a></li>
              <li><a href="/servicios" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Marketing Digital</a></li>
              <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Consultoría</a></li>
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-900/50">
            <h4 className="font-bold mb-4 text-lg text-neutral-900 dark:text-white">¿Listo para empezar?</h4>
            <p className="text-neutral-700 dark:text-neutral-300 text-sm mb-5">Cuéntanos sobre tu proyecto y te asesoraremos en la mejor estrategia.</p>
            <Link href="/contacto" className="inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all hover:shadow-lg w-full">
              Contactanos
            </Link>
          </div>
        </div>

        {/* Color Palette */}
        <div className="my-12 py-8 border-y border-neutral-200 dark:border-neutral-800">
          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-4 uppercase tracking-wider">Paleta de Colores</p>
          <div className="flex flex-wrap gap-3">
            {colorPalette.map((color, idx) => (
              <div key={idx} className={`w-12 h-12 ${color} rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer`} title={`Color ${idx + 1}`} />
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-neutral-600 dark:text-neutral-500 text-sm gap-4">
          <p>© {new Date().getFullYear()} YADA CREACIONES. Todos los derechos reservados.</p>
          <p>Hecho con ♥ por el equipo YADA</p>
        </div>
      </div>
    </footer>
  )
}
