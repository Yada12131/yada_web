'use client'

import Link from 'next/link'
import { ArrowRight, Instagram, MessageCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

interface HeroProps {
  titulo: string
  subtitulo: string
  descripcion: string
  slides?: Array<{ titulo: string; descripcion: string }>
}

export default function HeroSection({ titulo, subtitulo, descripcion, slides = [] }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides])

  const displaySlides = slides.length > 0 ? slides : [{ titulo, descripcion }]

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/30 via-purple-500/20 to-blue-500/30 blur-[120px] rounded-full" />
      </div>

      {/* Social icons - top right */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40">
        <a href="#" className="w-12 h-12 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
          <Instagram className="w-6 h-6" />
        </a>
        <a href="#" className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-lg md:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            {subtitulo}
          </h2>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            {titulo}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            {descripcion}
          </p>

          {/* Dots indicator */}
          {displaySlides.length > 1 && (
            <div className="flex justify-center gap-2 mb-8">
              {displaySlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
          <Link 
            href="/contacto"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full text-lg hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-2 shadow-xl"
          >
            Contáctanos
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/servicios"
            className="px-8 py-4 bg-white/20 text-white font-bold rounded-full text-lg border border-white/50 hover:bg-white/30 transition-all"
          >
            Ver servicios
          </Link>
        </div>
      </div>
    </section>
  )
}
