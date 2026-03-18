'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from './actions'
import { Lock, Mail, Loader2, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const result = await login(formData)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else {
      router.push('/admin')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-neutral-950 opacity-50 z-0"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-neutral-700">
            <Lock className="w-8 h-8 text-neutral-300" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Administración Yada</h1>
          <p className="text-neutral-400 mt-2 text-sm">Ingresa tus credenciales para continuar</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
          >
            <p className="text-red-400 text-sm text-center">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Correo Electrónico</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-neutral-500" />
              </div>
              <input
                name="email"
                type="email"
                required
                className="block w-full pl-10 pr-3 py-3 border border-neutral-700 rounded-xl leading-5 bg-neutral-800 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all sm:text-sm"
                placeholder="admin@yada.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">Contraseña</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-neutral-500" />
              </div>
              <input
                name="password"
                type="password"
                required
                className="block w-full pl-10 pr-3 py-3 border border-neutral-700 rounded-xl leading-5 bg-neutral-800 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-black bg-white hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 focus:ring-offset-neutral-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed group gap-2"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Iniciar Sesión
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
