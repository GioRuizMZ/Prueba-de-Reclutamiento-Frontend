import type { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
}

// Botón base reutilizable.
export function Button({ variant = 'primary', className = '', ...props }: Props) {
  const styles =
    variant === 'primary'
      ? 'bg-white text-ink-950 hover:bg-ink-100'
      : 'border border-ink-600 text-white hover:bg-ink-800'

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/40 disabled:opacity-50 ${styles} ${className}`}
      {...props}
    />
  )
}
