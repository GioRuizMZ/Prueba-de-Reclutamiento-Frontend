import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getFilms, getFilm } from '@/services/films.service'
import { apiClient } from '@/lib/apiClient'
import type { Film } from '@/types/swapi'

vi.mock('@/lib/apiClient', () => ({
  apiClient: { get: vi.fn() },
}))

const mockGet = vi.mocked(apiClient.get)

const film: Film = {
  id: 1,
  title: 'A New Hope',
  episode: 4,
  director: 'George Lucas',
  producer: 'Gary Kurtz',
  releaseDate: '1977-05-25',
  openingCrawl: '',
  starshipCount: 8,
}

describe('films.service', () => {
  beforeEach(() => mockGet.mockReset())

  it('getFilms consulta el endpoint del backend y devuelve las películas', async () => {
    mockGet.mockResolvedValue({ data: [film] })
    const result = await getFilms()

    expect(mockGet).toHaveBeenCalledWith('/api/swapi/films')
    expect(result).toEqual([film])
  })

  it('getFilm consulta por id', async () => {
    mockGet.mockResolvedValue({ data: film })
    const result = await getFilm(1)

    expect(mockGet).toHaveBeenCalledWith('/api/swapi/films/1')
    expect(result).toEqual(film)
  })
})
