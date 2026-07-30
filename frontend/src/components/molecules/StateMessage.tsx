interface Props {
  variant?: 'error' | 'empty'
  title: string
  description?: string
}

// Mensaje para estados de error o vacío.
export function StateMessage({ variant = 'empty', title, description }: Props) {
  const border = variant === 'error' ? 'border-red-500/50' : 'border-ink-700'

  return (
    <div
      className={`rounded-lg border ${border} bg-ink-800 px-6 py-10 text-center`}
    >
      <p className="text-base font-semibold text-white">{title}</p>
      {description && (
        <p className="mt-1 text-sm text-ink-400">{description}</p>
      )}
    </div>
  )
}
