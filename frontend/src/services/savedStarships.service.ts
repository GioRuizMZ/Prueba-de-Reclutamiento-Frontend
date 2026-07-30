import { apiClient } from '@/lib/apiClient'
import type { SavedStarship, SavedStarshipInput } from '@/types/savedStarship'

// Guarda una nave en nuestra base de datos (procesa el formulario, punto 5).
export async function createSavedStarship(
  payload: SavedStarshipInput,
): Promise<SavedStarship> {
  const { data } = await apiClient.post<SavedStarship>('/api/starships', payload)
  return data
}
