'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react'

export default function Footer() {
  const pathname = usePathname()

  // Don't show public footer on admin routes
  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <footer className="bg-black text-white pt-20 pb-10 px-4 sm:px-6 lg:px-8 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center font-bold text-xl">
                Y
              </div>
              <span className="text-2xl font-black tracking-tighter">
                yada.
              </span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Construyendo experiencias digitales increíbles. Transformamos ideas en productos escalables.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-neutral-900 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-neutral-900 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-neutral-900 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Navegación</h4>
            <ul className="space-y-4 text-neutral-400 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Inicio</Link></li>
              <li><Link href="/nosotros" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Nosotros</Link></li>
              <li><Link href="/servicios" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Servicios</Link></li>
              <li><Link href="/precios" className="hover:text-white transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Precios</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Legal</h4>
            <ul className="space-y-4 text-neutral-400 text-sm">
              <li><Link href="#" className="hover:text-white transition-colors">Términos de Servicio</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Cookies</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">¿Listo para empezar?</h4>
            <p className="text-neutral-400 text-sm mb-4">Contáctanos para darle vida a tu proyecto.</p>
            <Link href="/contacto" className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors w-full sm:w-auto">
              Hablemos
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between text-neutral-500 text-sm gap-4">
          <p>© {new Date().getFullYear()} Yada. Todos los derechos reservados.</p>
          <p>Hecho con ♥ por el equipo Yada</p>
        </div>
      </div>
    </footer>
  )
}
