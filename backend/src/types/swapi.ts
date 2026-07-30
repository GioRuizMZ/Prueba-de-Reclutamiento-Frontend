// Tipos de los recursos de SWAPI (swapi.info) que usa el proxy del backend.

export interface Film {
  title: string
  episode_id: number
  opening_crawl: string
  director: string
  producer: string
  release_date: string
  starships: string[] // URLs de las naves que aparecen en la película
  url: string
}

export interface Starship {
  name: string
  model: string
  manufacturer: string
  cost_in_credits: string
  length: string
  max_atmosphering_speed: string
  crew: string
  passengers: string
  cargo_capacity: string
  consumables: string
  hyperdrive_rating: string
  MGLT: string
  starship_class: string
  url: string
}
