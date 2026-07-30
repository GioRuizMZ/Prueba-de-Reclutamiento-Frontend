import { Link } from 'react-router-dom'
import { LOGO_URL } from '@/config/navigation'

// Logotipo de Star Wars (solo imagen). Enlaza al inicio.
export function Logo() {
  return (
    <Link to="/" className="flex items-center">
      <img
        src={LOGO_URL}
        alt="Star Wars"
        className="h-11 w-auto shrink-0 sm:h-14"
      />
    </Link>
  )
}
