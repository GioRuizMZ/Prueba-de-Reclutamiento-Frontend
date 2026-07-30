import { describe, it, expect } from 'vitest'
import {
  extractId,
  toFilmDTO,
  toStarshipDTO,
} from '../src/mappers/swapi.mapper.js'
import type { Film, Starship } from '../src/types/swapi.js'

describe('extractId', () => {
  it('extrae el id numérico de una URL de SWAPI', () => {
    expect(extractId('https://swapi.info/api/films/1')).toBe(1)
    expect(extractId('https://swapi.info/api/starships/12')).toBe(12)
  })
})

describe('toFilmDTO', () => {
  const film: Film = {
    title: 'A New Hope',
    episode_id: 4,
    opening_crawl: 'It is a period...',
    director: 'George Lucas',
    producer: 'Gary Kurtz',
    release_date: '1977-05-25',
    starships: ['a', 'b', 'c'],
    url: 'https://swapi.info/api/films/1',
  }

  it('normaliza a camelCase, agrega id y cuenta las naves', () => {
    expect(toFilmDTO(film)).toEqual({
      id: 1,
      title: 'A New Hope',
      episode: 4,
      director: 'George Lucas',
      producer: 'Gary Kurtz',
      releaseDate: '1977-05-25',
      openingCrawl: 'It is a period...',
      starshipCount: 3,
    })
  })
})

describe('toStarshipDTO', () => {
  const starship: Starship = {
    name: 'X-wing',
    model: 'T-65 X-wing',
    manufacturer: 'Incom Corporation',
    cost_in_credits: '149999',
    length: '12.5',
    max_atmosphering_speed: '1050',
    crew: '1',
    passengers: '0',
    cargo_capacity: '110',
    consumables: '1 week',
    hyperdrive_rating: '1.0',
    MGLT: '100',
    starship_class: 'Starfighter',
    url: 'https://swapi.info/api/starships/12',
  }

  it('normaliza a camelCase y agrega id, omitiendo campos irrelevantes', () => {
    const dto = toStarshipDTO(starship)
    expect(dto).toEqual({
      id: 12,
      name: 'X-wing',
      model: 'T-65 X-wing',
      manufacturer: 'Incom Corporation',
      starshipClass: 'Starfighter',
      costInCredits: '149999',
      length: '12.5',
      crew: '1',
      passengers: '0',
      maxAtmospheringSpeed: '1050',
      cargoCapacity: '110',
      hyperdriveRating: '1.0',
      consumables: '1 week',
    })
    // No debe exponer campos crudos ni MGLT/url
    expect(dto).not.toHaveProperty('MGLT')
    expect(dto).not.toHaveProperty('url')
  })
})
