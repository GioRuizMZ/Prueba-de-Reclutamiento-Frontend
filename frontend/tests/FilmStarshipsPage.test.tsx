import { describe, it, expect, vi, beforeEach } from 'vitest'
import { act } from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { FilmStarshipsPage } from '@/pages/FilmStarshipsPage'
import { getFilmStarships } from '@/services/starships.service'
import type { Starship } from '@/types/swapi'

vi.mock('@/services/starships.service', () => ({
  getFilmStarships: vi.fn(),
}))

const mockGet = vi.mocked(getFilmStarships)

const ships: Starship[] = [
  {
    id: 2,
    name: 'CR90 corvette',
    model: 'CR90 corvette',
    manufacturer: 'CEC',
    starshipClass: 'corvette',
    costInCredits: '3500000',
    length: '150',
    crew: '30-165',
    passengers: '600',
    maxAtmospheringSpeed: '950',
    cargoCapacity: '3000000',
    hyperdriveRating: '2.0',
    consumables: '1 year',
  },
]

function renderPage() {
  render(
    <MemoryRouter
      initialEntries={[
        { pathname: '/peliculas/1/naves', state: { filmTitle: 'A New Hope' } },
      ]}
    >
      <Routes>
        <Route path="/peliculas/:filmId/naves" element={<FilmStarshipsPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('FilmStarshipsPage', () => {
  beforeEach(() => mockGet.mockReset())

  it('muestra el spinner mientras carga', async () => {
    let resolve!: (v: Starship[]) => void
    mockGet.mockReturnValue(new Promise<Starship[]>((r) => (resolve = r)))
    renderPage()
    expect(screen.getByText('Cargando naves...')).toBeInTheDocument()
    // Se resuelve para no dejar la promesa pendiente entre pruebas.
    await act(async () => resolve([]))
  })

  it('muestra el título de la película y las naves al cargar', async () => {
    mockGet.mockResolvedValue(ships)
    renderPage()
    expect(await screen.findByText('A New Hope')).toBeInTheDocument()
    // Se espera a que la data async resuelva antes de buscar la nave.
    expect(await screen.findAllByText(/CR90 corvette/)).not.toHaveLength(0)
  })

  it('muestra el enlace para volver a películas', async () => {
    mockGet.mockResolvedValue(ships)
    renderPage()
    expect(
      await screen.findByRole('link', { name: /Volver a películas/ }),
    ).toBeInTheDocument()
  })

  it('muestra un mensaje cuando la película no tiene naves', async () => {
    mockGet.mockResolvedValue([])
    renderPage()
    expect(
      await screen.findByText('Esta película no tiene naves registradas'),
    ).toBeInTheDocument()
  })
})
