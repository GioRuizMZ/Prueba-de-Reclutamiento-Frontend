import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { FilmsTable } from '@/components/organisms/FilmsTable'
import type { Film } from '@/types/swapi'

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

function renderWithRouter() {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<FilmsTable films={films} />} />
        <Route
          path="/peliculas/:filmId/naves"
          element={<div>Pantalla de naves</div>}
        />
      </Routes>
    </MemoryRouter>,
  )
}

describe('FilmsTable', () => {
  it('muestra el título y el director de la película', () => {
    renderWithRouter()
    expect(screen.getAllByText(/A New Hope/)[0]).toBeInTheDocument()
    expect(screen.getAllByText(/George Lucas/)[0]).toBeInTheDocument()
  })

  it('navega a la pantalla de naves al pulsar "Ver naves"', async () => {
    renderWithRouter()
    await userEvent.click(screen.getAllByRole('button', { name: 'Ver naves' })[0])
    expect(screen.getByText('Pantalla de naves')).toBeInTheDocument()
  })
})
