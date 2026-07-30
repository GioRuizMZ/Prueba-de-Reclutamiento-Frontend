import { Link } from 'react-router-dom'

interface Props {
  to: string
  label: string
}

// Enlace para regresar a la pantalla anterior.
export function BackLink({ to, label }: Props) {
  return (
    <Link
      to={to}
      className="mb-4 inline-flex items-center gap-1 text-sm text-ink-400 transition-colors hover:text-white"
    >
      <span aria-hidden="true">←</span>
      {label}
    </Link>
  )
}
