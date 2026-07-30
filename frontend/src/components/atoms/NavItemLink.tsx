import { NavLink } from 'react-router-dom'
import type { NavItem } from '@/config/navigation'

interface Props {
  item: NavItem
  onClick?: () => void
  /** Variante de estilo: horizontal (navbar) o vertical (sidebar). */
  variant?: 'navbar' | 'sidebar'
}

// Enlace de navegación con estado activo resaltado en amarillo sable.
export function NavItemLink({ item, onClick, variant = 'navbar' }: Props) {
  const base =
    variant === 'navbar'
      ? 'px-3 py-2 text-sm font-medium transition-colors'
      : 'block rounded-md px-3 py-2 text-base font-medium transition-colors'

  return (
    <NavLink
      to={item.to}
      end={item.to === '/'}
      onClick={onClick}
      className={({ isActive }) =>
        `${base} ${
          isActive
            ? 'text-white'
            : 'text-ink-400 hover:text-white'
        }`
      }
    >
      {item.label}
    </NavLink>
  )
}
