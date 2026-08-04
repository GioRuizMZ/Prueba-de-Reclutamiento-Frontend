interface Props {
  title: string
  subtitle?: string
}

// Encabezado de sección reutilizable en todas las pantallas.
// Detalle tipo tarjeta de nave: barra blanca (que crece al hacer hover sobre
// el título) + puntito, ambos con un glow suave.
export function PageHeader({ title, subtitle }: Props) {
  return (
    <div className="mb-6">
      <h1 className="peer block text-2xl font-bold text-white sm:text-3xl">
        {title}
      </h1>
      <span
        aria-hidden="true"
        className="mt-2 inline-block h-1 w-1 rounded-full bg-white/80 align-middle shadow-[0_0_8px_1px_rgba(255,255,255,0.5)]"
      />
      <span
        aria-hidden="true"
        className="ml-2 mt-2 inline-block h-1 w-12 rounded-full bg-white align-middle shadow-[0_0_12px_2px_rgba(255,255,255,0.55)] transition-[width] duration-300 ease-out peer-hover:w-40"
      />
      {subtitle && <p className="mt-2 text-sm text-ink-400">{subtitle}</p>}
    </div>
  )
}
