'use client'

import { useState } from 'react'
import { submitContact } from './actions'
import { MapPin, Phone, Mail, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function ContactoPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const result = await submitContact(formData)
    
    if (result.success) {
      setSuccess(true)
      ;(e.target as HTMLFormElement).reset()
    }
    
    setLoading(false)
  }

  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">Hablemos</h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Estamos listos para transformar tus ideas. Completa el formulario o contáctanos directamente.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mt-20">
          
          {/* Contact Info Sidebar */}
          <div className="space-y-10">
            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-800">
              <h3 className="text-2xl font-bold mb-8">Información de Contacto</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white dark:bg-black rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Correo Electrónico</p>
                    <a href="mailto:hola@yada.com" className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors">hola@yada.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white dark:bg-black rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Teléfono</p>
                    <a href="tel:+1234567890" className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors">+57 300 000 0000</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white dark:bg-black rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Oficina</p>
                    <p className="text-neutral-500">Bogotá, Colombia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-neutral-900 p-8 sm:p-10 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl">
            {success ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                 <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10" />
                 </div>
                 <h3 className="text-3xl font-bold">¡Mensaje Enviado!</h3>
                 <p className="text-neutral-500 max-w-md">Gracias por escribirnos. Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas hábiles.</p>
                 <button onClick={() => setSuccess(false)} className="mt-8 text-black dark:text-white font-bold underline">
                   Enviar otro mensaje
                 </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold mb-2">Nombre Completo</label>
                  <input type="text" id="name" name="name" required className="w-full px-5 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all" placeholder="Juan Pérez" />
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold mb-2">Correo Electrónico</label>
                    <input type="email" id="email" name="email" required className="w-full px-5 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all" placeholder="juan@ejemplo.com" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold mb-2">Teléfono (Opcional)</label>
                    <input type="tel" id="phone" name="phone" className="w-full px-5 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all" placeholder="+57 320..." />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-bold mb-2">Servicio de interés</label>
                  <select id="service" name="service" required className="w-full px-5 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all appearance-none cursor-pointer">
                    <option value="" disabled selected>Selecciona una opción</option>
                    <option value="Desarrollo Web">Desarrollo Web</option>
                    <option value="Desarrollo Móvil">Desarrollo Móvil</option>
                    <option value="Diseño UI/UX">Diseño UI/UX</option>
                    <option value="Consultoría">Consultoría Tecnológica</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold mb-2">Mensaje</label>
                  <textarea id="message" name="message" required rows={4} className="w-full px-5 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all resize-y" placeholder="Cuéntanos más sobre tu proyecto..."></textarea>
                </div>

                <button type="submit" disabled={loading} className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:hover:scale-100">
                  {loading ? "Enviando..." : "Enviar Mensaje"} <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
