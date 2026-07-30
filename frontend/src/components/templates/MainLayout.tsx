import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/organisms/Navbar'
import { MobileSidebar } from '@/components/organisms/MobileSidebar'

// Plantilla principal: se comparte en todas las pantallas (navbar + sidebar + contenido).
export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-ink-950">
      <Navbar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
      />
      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <Outlet />
      </main>

      <footer className="border-t border-ink-700 py-4 text-center text-xs text-ink-400/60">
        Prueba frontend · Datos de SWAPI (swapi.info)
      </footer>
    </div>
  )
}
