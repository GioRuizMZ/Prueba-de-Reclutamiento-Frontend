import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { FilmsPage } from '@/pages/FilmsPage'
import { getFilms } from '@/services/films.service'
import type { Film } from '@/types/swapi'

// Se mockea el servicio para no depender de la red.
vi.mock('@/services/films.service', () => ({
  getFilms: vi.fn(),
}))

const mockGetFilms = vi.mocked(getFilms)

const films: Film[] = [
  {
    id: 1,
    title: 'A New Hope',
    episode: 4,
    openingCrawl: '',
    director: 'George Lucas',
    producer: 'Gary Kurtz',
    releaseDate: '1977-05-25',
    starshipCount: 8,
  },
]

function renderPage() {
  render(
    <MemoryRouter>
      <FilmsPage />
    </MemoryRouter>,
  )
}

describe('FilmsPage', () => {
  beforeEach(() => {
    mockGetFilms.mockReset()
  })

  it('muestra el spinner mientras carga', () => {
    mockGetFilms.mockReturnValue(new Promise(() => {})) // nunca resuelve
    renderPage()
    expect(screen.getByText('Cargando películas...')).toBeInTheDocument()
  })

  it('muestra las películas cuando la carga es exitosa', async () => {
    mockGetFilms.mockResolvedValue(films)
    renderPage()
    expect(await screen.findAllByText(/A New Hope/)).not.toHaveLength(0)
  })

  it('muestra un mensaje de error si falla la carga', async () => {
    mockGetFilms.mockRejectedValue(new Error('Falló la red'))
    renderPage()
    expect(
      await screen.findByText('No se pudieron cargar las películas'),
    ).toBeInTheDocument()
  })
})
