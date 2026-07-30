import { forwardRef, type InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

// Campo de texto con etiqueta y mensaje de error (compatible con react-hook-form).
export const TextField = forwardRef<HTMLInputElement, Props>(
  ({ label, error, id, name, ...props }, ref) => {
    const inputId = id ?? name

    return (
      <div>
        <label
          htmlFor={inputId}
          className="mb-1 block text-sm font-medium text-ink-300"
        >
          {label}
        </label>
        <input
          id={inputId}
          name={name}
          ref={ref}
          aria-invalid={error ? 'true' : undefined}
          className={`w-full rounded-md border bg-ink-950 px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-ink-500 focus:ring-2 focus:ring-white/30 ${
            error ? 'border-red-500' : 'border-ink-600 focus:border-ink-400'
          }`}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    )
  },
)

TextField.displayName = 'TextField'
