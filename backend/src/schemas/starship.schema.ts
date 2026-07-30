import { z } from 'zod'

// Validación de los datos que llegan del formulario (Pantalla 3.1).
export const createStarshipSchema = z.object({
  name: z
    .string({ error: 'El nombre es obligatorio' })
    .trim()
    .min(1, 'El nombre es obligatorio'),
  model: z
    .string({ error: 'El modelo es obligatorio' })
    .trim()
    .min(1, 'El modelo es obligatorio'),
  maxAtmospheringSpeed: z
    .string({ error: 'La velocidad es obligatoria' })
    .trim()
    .min(1, 'La velocidad es obligatoria'),
  manufacturer: z.string().trim().optional(),
  starshipClass: z.string().trim().optional(),
  crew: z.string().trim().optional(),
  passengers: z.string().trim().optional(),
  costInCredits: z.string().trim().optional(),
  swapiUrl: z.string().trim().url('URL inválida').optional(),
})

// En update todos los campos son opcionales (PATCH-friendly).
export const updateStarshipSchema = createStarshipSchema.partial()

export type CreateStarshipInput = z.infer<typeof createStarshipSchema>
export type UpdateStarshipInput = z.infer<typeof updateStarshipSchema>
