// Indicador de carga.
export function Spinner({ label = 'Cargando...' }: { label?: string }) {
  return (
    <div className="flex w-full items-center justify-center gap-3 py-12 text-ink-400">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-ink-600 border-t-white" />
      <span className="text-sm">{label}</span>
    </div>
  )
}
