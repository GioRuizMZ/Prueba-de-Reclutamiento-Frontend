import { apiClient } from '@/lib/apiClient'
import type { Film } from '@/types/swapi'

// Obtiene todas las películas (el backend ya las devuelve ordenadas por episodio).
export async function getFilms(): Promise<Film[]> {
  const { data } = await apiClient.get<Film[]>('/api/swapi/films')
  return data
}

// Obtiene una película por id.
export async function getFilm(id: number | string): Promise<Film> {
  const { data } = await apiClient.get<Film>(`/api/swapi/films/${id}`)
  return data
}
