'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Planes', href: '/precios' },
  { name: 'Contacto', href: '/contacto' },
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
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-xl flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform shadow-lg">
                Y
              </div>
              <span className="text-2xl font-black tracking-tighter text-black dark:text-white">
                yada.
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={`text-sm font-semibold transition-colors hover:text-black dark:hover:text-white ${pathname === link.href ? 'text-black dark:text-white' : 'text-neutral-500 dark:text-neutral-400'}`}
                >
                  {link.name}
                </Link>
              ))}
              <Link href="/contacto" className="px-5 py-2.5 bg-black dark:bg-white text-white dark:text-black text-sm font-bold rounded-full hover:scale-105 transition-transform shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.12)]">
                Empezar
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-black dark:text-white"
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
            className="fixed inset-0 z-40 bg-white dark:bg-black pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl font-bold ${pathname === link.href ? 'text-black dark:text-white' : 'text-neutral-500 dark:text-neutral-400'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
