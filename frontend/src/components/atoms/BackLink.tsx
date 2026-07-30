import { Link, useNavigate } from 'react-router-dom'

interface Props {
  label: string
  /** Ruta a la que volver. Si se omite, regresa en el historial. */
  to?: string
}

const className =
  'group mb-4 inline-flex items-center gap-1 text-sm text-ink-400 transition-colors hover:text-white'

// Enlace para regresar. En hover la flecha se desliza a la izquierda.
export function BackLink({ label, to }: Props) {
  const navigate = useNavigate()

  const content = (
    <>
      <span
        aria-hidden="true"
        className="transition-transform duration-200 ease-out group-hover:-translate-x-1"
      >
        ←
      </span>
      {label}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={className}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" onClick={() => navigate(-1)} className={className}>
      {content}
    </button>
  )
}
