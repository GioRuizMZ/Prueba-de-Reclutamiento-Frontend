// Tipos normalizados que expone nuestro backend (DTOs, camelCase, con id).

export interface Film {
  id: number
  title: string
  episode: number
  director: string
  producer: string
  releaseDate: string
  openingCrawl: string
  starshipCount: number
}

export interface Starship {
  id: number
  name: string
  model: string
  manufacturer: string
  starshipClass: string
  costInCredits: string
  length: string
  crew: string
  passengers: string
  maxAtmospheringSpeed: string
  cargoCapacity: string
  hyperdriveRating: string
  consumables: string
}
