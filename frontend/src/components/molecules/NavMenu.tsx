import { NAV_ITEMS } from '@/config/navigation'
import { NavItemLink } from '@/components/atoms/NavItemLink'

interface Props {
  variant?: 'navbar' | 'sidebar'
  onItemClick?: () => void
}

// Lista de enlaces de navegación. Se usa horizontal en el navbar y vertical en el sidebar.
export function NavMenu({ variant = 'navbar', onItemClick }: Props) {
  return (
    <nav
      className={
        variant === 'navbar'
          ? 'flex items-center gap-1'
          : 'flex flex-col gap-1'
      }
    >
      {NAV_ITEMS.map((item) => (
        <NavItemLink
          key={item.to}
          item={item}
          variant={variant}
          onClick={onItemClick}
        />
      ))}
    </nav>
  )
}
