import { Logo } from '@/components/atoms/Logo'
import { NavMenu } from '@/components/molecules/NavMenu'

interface Props {
  open: boolean
  onClose: () => void
}

// Sidebar deslizable para móvil. Se muestra al pulsar el botón hamburguesa.
export function MobileSidebar({ open, onClose }: Props) {
  return (
    <div
      className={`fixed inset-0 z-40 md:hidden ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      {/* Fondo oscuro */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panel lateral */}
      <aside
        className={`absolute left-0 top-0 flex h-full w-72 max-w-[80%] flex-col gap-6 border-r border-ink-700 bg-ink-950 p-5 shadow-xl transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <Logo />
        </div>
        <NavMenu variant="sidebar" onItemClick={onClose} />
      </aside>
    </div>
  )
}
