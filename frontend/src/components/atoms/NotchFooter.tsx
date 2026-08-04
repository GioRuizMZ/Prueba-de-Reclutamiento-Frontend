interface Props {
  className?: string
}

// Franja gris con la muesca (trapecio) recortada en el borde inferior, tipo
// tarjeta de Star Wars. Se usa como pie de la tabla: dentro de <tfoot> en
// desktop y debajo del listado de cards en móvil.
export function NotchFooter({ className = '' }: Props) {
  return (
    <div
      aria-hidden="true"
      className={`clip-notch-footer h-6 bg-ink-800 ${className}`}
    />
  )
}
