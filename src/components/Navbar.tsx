'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Instagram, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Quiénes Somos', href: '/nosotros' },
  { name: 'Servicios de Diseño', href: '/servicios' },
  { name: 'Portafolio', href: '/servicios' },
  { name: 'Socios Aliados', href: '/fundadores' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Don't show public navbar on admin routes
  if (pathname?.startsWith('/admin')) {
    return null
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gradient-to-r from-white/90 to-white/80 dark:from-neutral-900/90 dark:to-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 py-3 shadow-sm' : 'bg-white/10 dark:bg-black/10 backdrop-blur-sm py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo YADA */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg transform group-hover:scale-110 transition-transform shadow-lg" />
                <svg className="w-7 h-7 text-white relative z-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 10L85 90H15L50 10Z" fill="currentColor" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tighter text-black dark:text-white">
                YADA
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`text-sm font-semibold transition-colors hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 ${pathname === link.href ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600' : 'text-neutral-600 dark:text-neutral-400'}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Social Icons + CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a href="#" className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-pink-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-green-500 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <Link href="/contacto" className="ml-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-bold rounded-full transition-all hover:shadow-lg">
                Contactar
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-black dark:text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white dark:bg-black pt-24 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-6 text-center pb-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-xl font-bold transition-colors ${pathname === link.href ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600' : 'text-neutral-600 dark:text-neutral-400'}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex justify-center gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <a href="#" className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-pink-500 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-green-500 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
              <Link href="/contacto" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full w-full text-center">
                Contactar
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
