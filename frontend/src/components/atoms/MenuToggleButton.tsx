interface Props {
  open: boolean
  onClick: () => void
}

// Botón hamburguesa / cerrar para el sidebar móvil.
export function MenuToggleButton({ open, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
      aria-expanded={open}
      className="inline-flex items-center justify-center rounded-md p-2 text-ink-400 hover:bg-ink-700 hover:text-white md:hidden"
    >
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
      >
        {open ? (
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
        )}
      </svg>
    </button>
  )
}
