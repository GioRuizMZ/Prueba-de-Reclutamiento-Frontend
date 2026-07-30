import { HttpError } from '../lib/httpError.js'
import type { Film, Starship, FilmDTO, StarshipDTO } from '../types/swapi.js'
import { toFilmDTO, toStarshipDTO } from '../mappers/swapi.mapper.js'

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

// Todas las películas, ordenadas por episodio (1 -> 6) y normalizadas.
export async function getFilms(): Promise<FilmDTO[]> {
  const films = await fetchFromSwapi<Film[]>('/films')
  return films.sort((a, b) => a.episode_id - b.episode_id).map(toFilmDTO)
}

// Una película por id, normalizada.
export async function getFilm(id: string): Promise<FilmDTO> {
  const film = await fetchFromSwapi<Film>(`/films/${id}`)
  return toFilmDTO(film)
}

// Naves que aparecen en una película: resuelve cada URL y las normaliza.
export async function getFilmStarships(id: string): Promise<StarshipDTO[]> {
  const film = await fetchFromSwapi<Film>(`/films/${id}`)
  const starships = await Promise.all(
    film.starships.map((url) =>
      fetchFromSwapi<Starship>(url.replace(SWAPI_BASE, '')),
    ),
  )
  return starships.map(toStarshipDTO)
}

// Una nave por id, normalizada.
export async function getStarship(id: string): Promise<StarshipDTO> {
  const starship = await fetchFromSwapi<Starship>(`/starships/${id}`)
  return toStarshipDTO(starship)
}
