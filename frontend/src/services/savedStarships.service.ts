import { apiClient } from '@/lib/apiClient'
import type { SavedStarship, SavedStarshipInput } from '@/types/savedStarship'

// Guarda una nave en nuestra base de datos (procesa el formulario, punto 5).
export async function createSavedStarship(
  payload: SavedStarshipInput,
): Promise<SavedStarship> {
  const { data } = await apiClient.post<SavedStarship>('/api/starships', payload)
  return data
}

// Actualiza una nave guardada existente (edita la misma en vez de crear otra).
export async function updateSavedStarship(
  id: number,
  payload: SavedStarshipInput,
): Promise<SavedStarship> {
  const { data } = await apiClient.put<SavedStarship>(
    `/api/starships/${id}`,
    payload,
  )
  return data
}

// Lista las naves guardadas.
export async function getSavedStarships(): Promise<SavedStarship[]> {
  const { data } = await apiClient.get<SavedStarship[]>('/api/starships')
  return data
}

// Elimina una nave guardada por id.
export async function deleteSavedStarship(id: number): Promise<void> {
  await apiClient.delete(`/api/starships/${id}`)
}
