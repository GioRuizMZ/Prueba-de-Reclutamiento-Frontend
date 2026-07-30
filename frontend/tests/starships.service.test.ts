import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getFilmStarships, getStarship } from '@/services/starships.service'
import { apiClient } from '@/lib/apiClient'

vi.mock('@/lib/apiClient', () => ({
  apiClient: { get: vi.fn() },
}))

const mockGet = vi.mocked(apiClient.get)

describe('starships.service', () => {
  beforeEach(() => mockGet.mockReset())

  it('getFilmStarships consulta las naves de la película', async () => {
    mockGet.mockResolvedValue({ data: [{ id: 2, name: 'CR90 corvette' }] })
    const result = await getFilmStarships(1)

    expect(mockGet).toHaveBeenCalledWith('/api/swapi/films/1/starships')
    expect(result).toEqual([{ id: 2, name: 'CR90 corvette' }])
  })

  it('getStarship consulta el detalle por id', async () => {
    mockGet.mockResolvedValue({ data: { id: 9, name: 'Death Star' } })
    const result = await getStarship(9)

    expect(mockGet).toHaveBeenCalledWith('/api/swapi/starships/9')
    expect(result).toEqual({ id: 9, name: 'Death Star' })
  })
})
