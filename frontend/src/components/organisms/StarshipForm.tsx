import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  starshipFormSchema,
  type StarshipFormValues,
} from '@/schemas/starshipForm.schema'
import { TextField } from '@/components/atoms/TextField'
import { Button } from '@/components/atoms/Button'

interface Props {
  defaultValues: StarshipFormValues
  onSubmit: (values: StarshipFormValues) => Promise<void> | void
  submitting?: boolean
}

// Formulario con 3 datos de la nave y validaciones (Pantalla 3.1).
export function StarshipForm({ defaultValues, onSubmit, submitting }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StarshipFormValues>({
    resolver: zodResolver(starshipFormSchema),
    defaultValues,
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mx-auto w-full max-w-md space-y-4 rounded-lg border border-ink-700 bg-ink-800 p-6"
    >
      <TextField
        label="Nombre"
        {...register('name')}
        error={errors.name?.message}
      />
      <TextField
        label="Modelo"
        {...register('model')}
        error={errors.model?.message}
      />
      <TextField
        label="Velocidad atmosférica"
        inputMode="numeric"
        {...register('maxAtmospheringSpeed')}
        error={errors.maxAtmospheringSpeed?.message}
      />
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? 'Guardando...' : 'Guardar'}
      </Button>
    </form>
  )
}
