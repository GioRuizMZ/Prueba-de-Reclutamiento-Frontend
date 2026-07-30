export interface DetailItem {
  label: string
  value: string
}

interface Props {
  items: DetailItem[]
}

// Lista de pares etiqueta/valor para mostrar detalles.
export function DetailList({ items }: Props) {
  return (
    <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-ink-700 bg-ink-700 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="bg-ink-800 px-4 py-3">
          <dt className="text-xs uppercase tracking-wide text-ink-400">
            {item.label}
          </dt>
          <dd className="mt-1 text-sm font-medium text-white">
            {item.value || '—'}
          </dd>
        </div>
      ))}
    </dl>
  )
}
