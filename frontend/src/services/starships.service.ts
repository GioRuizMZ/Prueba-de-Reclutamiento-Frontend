import { apiClient } from '@/lib/apiClient'
import type { Starship } from '@/types/swapi'

// Naves que aparecen en una película (el backend resuelve las URLs de SWAPI).
export async function getFilmStarships(filmId: number | string): Promise<Starship[]> {
  const { data } = await apiClient.get<Starship[]>(
    `/api/swapi/films/${filmId}/starships`,
  )
  return data
}

// Detalle de una nave por id.
export async function getStarship(id: number | string): Promise<Starship> {
  const { data } = await apiClient.get<Starship>(`/api/swapi/starships/${id}`)
  return data
}
