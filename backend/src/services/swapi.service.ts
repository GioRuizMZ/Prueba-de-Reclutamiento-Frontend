import { HttpError } from '../lib/httpError.js'
import type { Film, Starship } from '../types/swapi.js'

const SWAPI_BASE = process.env.SWAPI_BASE_URL || 'https://swapi.info/api'

// Petición genérica a SWAPI con manejo de errores.
async function fetchFromSwapi<T>(path: string): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${SWAPI_BASE}${path}`)
  } catch {
    throw new HttpError(502, 'No se pudo contactar a SWAPI')
  }

  if (res.status === 404) {
    throw new HttpError(404, 'Recurso no encontrado en SWAPI')
  }
  if (!res.ok) {
    throw new HttpError(502, `SWAPI respondió con estado ${res.status}`)
  }

  return (await res.json()) as T
}

// Todas las películas, ordenadas por episodio (1 -> 6).
export async function getFilms(): Promise<Film[]> {
  const films = await fetchFromSwapi<Film[]>('/films')
  return films.sort((a, b) => a.episode_id - b.episode_id)
}

// Una película por id.
export async function getFilm(id: string): Promise<Film> {
  return fetchFromSwapi<Film>(`/films/${id}`)
}

// Naves que aparecen en una película: resuelve cada URL de nave.
export async function getFilmStarships(id: string): Promise<Starship[]> {
  const film = await getFilm(id)
  const starships = await Promise.all(
    film.starships.map((url) => fetchFromSwapi<Starship>(url.replace(SWAPI_BASE, ''))),
  )
  return starships
}

// Una nave por id.
export async function getStarship(id: string): Promise<Starship> {
  return fetchFromSwapi<Starship>(`/starships/${id}`)
}
