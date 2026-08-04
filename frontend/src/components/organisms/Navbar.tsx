import { Logo } from '@/components/atoms/Logo'
import { MenuToggleButton } from '@/components/atoms/MenuToggleButton'
import { NavMenu } from '@/components/molecules/NavMenu'
import { PROJECT_NAME } from '@/config/navigation'

interface Props {
  onToggleSidebar: () => void
  sidebarOpen: boolean
}

// Barra superior: logo a la izquierda, título centrado y enlaces a la derecha
// en desktop; en móvil, logo a la izquierda y botón hamburguesa a la derecha.
export function Navbar({ onToggleSidebar, sidebarOpen }: Props) {
  return (
    <header className="sticky top-0 z-30 bg-ink-950/90 backdrop-blur">
      <div className="mx-auto grid h-20 max-w-6xl grid-cols-3 items-center px-4 sm:px-6">
        {/* Izquierda: logo */}
        <div className="flex justify-start">
          <Logo />
        </div>

        {/* Centro: título del proyecto */}
        <div className="flex justify-center">
          <span className="whitespace-nowrap text-center text-lg font-semibold tracking-wide text-white sm:text-xl">
            {PROJECT_NAME}
          </span>
        </div>

        {/* Derecha: enlaces (desktop) o botón hamburguesa (móvil) */}
        <div className="flex justify-end">
          <div className="hidden md:block">
            <NavMenu variant="navbar" />
          </div>
          <MenuToggleButton open={sidebarOpen} onClick={onToggleSidebar} />
        </div>
      </div>
    </header>
  )
}
