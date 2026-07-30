interface Props {
  title: string
  subtitle?: string
}

// Encabezado de sección reutilizable en todas las pantallas.
// La barra blanca crece de ancho al hacer hover sobre el título.
export function PageHeader({ title, subtitle }: Props) {
  return (
    <div className="mb-6">
      <h1 className="peer inline-block text-2xl font-bold text-white sm:text-3xl">
        {title}
      </h1>
      <span
        aria-hidden="true"
        className="mt-2 block h-1 w-12 rounded-full bg-white transition-[width] duration-300 ease-out peer-hover:w-40"
      />
      {subtitle && <p className="mt-2 text-sm text-ink-400">{subtitle}</p>}
    </div>
  )
}
