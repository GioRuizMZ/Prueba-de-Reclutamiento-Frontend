import type { Film, Starship, FilmDTO, StarshipDTO } from '../types/swapi.js'

// Extrae el id numérico desde una URL de SWAPI. Ej: ".../films/1" -> 1.
export function extractId(url: string): number {
  const parts = url.split('/').filter(Boolean)
  return Number(parts[parts.length - 1])
}

// Normaliza una película de SWAPI al DTO de nuestra API.
export function toFilmDTO(film: Film): FilmDTO {
  return {
    id: extractId(film.url),
    title: film.title,
    episode: film.episode_id,
    director: film.director,
    producer: film.producer,
    releaseDate: film.release_date,
    openingCrawl: film.opening_crawl,
    starshipCount: film.starships.length,
  }
}

// Normaliza una nave de SWAPI al DTO de nuestra API.
export function toStarshipDTO(starship: Starship): StarshipDTO {
  return {
    id: extractId(starship.url),
    name: starship.name,
    model: starship.model,
    manufacturer: starship.manufacturer,
    starshipClass: starship.starship_class,
    costInCredits: starship.cost_in_credits,
    length: starship.length,
    crew: starship.crew,
    passengers: starship.passengers,
    maxAtmospheringSpeed: starship.max_atmosphering_speed,
    cargoCapacity: starship.cargo_capacity,
    hyperdriveRating: starship.hyperdrive_rating,
    consumables: starship.consumables,
  }
}
