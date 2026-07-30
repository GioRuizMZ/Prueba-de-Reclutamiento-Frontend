import { z } from 'zod'

// Validaciones del formulario de la nave (Pantalla 3.1).
export const starshipFormSchema = z.object({
  name: z.string().trim().min(1, 'El nombre es obligatorio'),
  model: z.string().trim().min(1, 'El modelo es obligatorio'),
  maxAtmospheringSpeed: z
    .string()
    .trim()
    .min(1, 'La velocidad es obligatoria')
    .regex(/^\d+$/, 'La velocidad debe ser un número'),
})

export type StarshipFormValues = z.infer<typeof starshipFormSchema>
