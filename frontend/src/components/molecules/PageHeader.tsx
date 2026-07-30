interface Props {
  title: string
  subtitle?: string
}

// Encabezado de sección reutilizable en todas las pantallas.
export function PageHeader({ title, subtitle }: Props) {
  return (
    <div className="mb-6 border-l-4 border-white pl-4">
      <h1 className="text-2xl font-bold text-white sm:text-3xl">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-ink-400/70">{subtitle}</p>}
    </div>
  )
}
