// Nave guardada en NUESTRA base de datos (CRUD propio del backend).

export interface SavedStarship {
  id: number
  name: string
  model: string
  maxAtmospheringSpeed: string
  manufacturer?: string | null
  starshipClass?: string | null
  crew?: string | null
  passengers?: string | null
  costInCredits?: string | null
  swapiUrl?: string | null
  createdAt: string
  updatedAt: string
}

// Datos que envía el formulario (Pantalla 3.1).
export interface SavedStarshipInput {
  name: string
  model: string
  maxAtmospheringSpeed: string
}
