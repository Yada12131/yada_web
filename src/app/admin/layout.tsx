'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  Image as ImageIcon,
  MessageSquare,
  CreditCard,
  Building,
  Briefcase,
  Menu,
  X,
  LogOut,
  MessageCircle,
  Zap
} from 'lucide-react'
import { logout } from './login/actions'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Inicio (Home)', href: '/admin/home', icon: ImageIcon },
  { name: 'Intro', href: '/admin/intro', icon: Building },
  { name: 'Servicios', href: '/admin/servicios', icon: Briefcase },
  { name: 'Testimonios', href: '/admin/testimonios', icon: MessageCircle },
  { name: 'CTA', href: '/admin/cta', icon: Zap },
  { name: 'Nosotros', href: '/admin/nosotros', icon: Building },
  { name: 'Fundadores', href: '/admin/fundadores', icon: Users },
  { name: 'Precios', href: '/admin/precios', icon: CreditCard },
  { name: 'Contactos', href: '/admin/contactos', icon: MessageSquare },
  { name: 'General Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const handleLogout = async () => {
    await logout()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 font-sans text-neutral-900 dark:text-neutral-100 flex">
      
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-neutral-200 dark:border-neutral-800">
          <Link href="/admin" className="text-xl font-bold tracking-tight">yada<span className="text-neutral-500">_admin</span></Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-neutral-500 hover:text-neutral-900 dark:hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4 px-2">Gestión de Contenido</div>
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2.5 text-sm font-medium rounded-xl transition-all ${
                  isActive
                    ? 'bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 hover:text-black dark:hover:text-white'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${
                    isActive ? 'text-black dark:text-white' : 'text-neutral-400 group-hover:text-neutral-500 dark:group-hover:text-neutral-300'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            )
          })}
        </div>

        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
          <button
            onClick={handleLogout}
            className="group flex w-full items-center px-2 py-2 text-sm font-medium rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
          >
            <LogOut className="mr-3 h-5 w-5 flex-shrink-0 text-red-500" aria-hidden="true" />
            Cerrar Sesión
          </button>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="text-lg font-bold tracking-tight">yada<span className="text-neutral-500">_admin</span></div>
          <div className="w-6"></div> {/* Spacer for centering */}
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>

    </div>
  )
}
