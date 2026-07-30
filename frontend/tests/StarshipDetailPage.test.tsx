import { describe, it, expect, vi, beforeEach } from 'vitest'
import { act } from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { StarshipDetailPage } from '@/pages/StarshipDetailPage'
import { getStarship } from '@/services/starships.service'
import type { Starship } from '@/types/swapi'

vi.mock('@/services/starships.service', () => ({
  getStarship: vi.fn(),
}))

const mockGet = vi.mocked(getStarship)

const ship: Starship = {
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
}

function renderPage() {
  render(
    <MemoryRouter initialEntries={['/naves/12']}>
      <Routes>
        <Route path="/naves/:starshipId" element={<StarshipDetailPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('StarshipDetailPage', () => {
  beforeEach(() => mockGet.mockReset())

  it('muestra el spinner mientras carga', async () => {
    let resolve!: (v: Starship) => void
    mockGet.mockReturnValue(new Promise<Starship>((r) => (resolve = r)))
    renderPage()
    expect(screen.getByText('Cargando nave...')).toBeInTheDocument()
    await act(async () => resolve(ship))
  })

  it('muestra el detalle de la nave al cargar', async () => {
    mockGet.mockResolvedValue(ship)
    renderPage()
    expect(await screen.findByRole('heading', { name: 'X-wing' })).toBeInTheDocument()
    expect(screen.getByText('Incom Corporation')).toBeInTheDocument()
  })

  it('consulta la nave por el id de la ruta', async () => {
    mockGet.mockResolvedValue(ship)
    renderPage()
    await screen.findByRole('heading', { name: 'X-wing' })
    expect(mockGet).toHaveBeenCalledWith('12')
  })
})
