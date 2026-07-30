import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { StarshipsTable } from '@/components/organisms/StarshipsTable'
import type { Starship } from '@/types/swapi'

const starships: Starship[] = [
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

function renderWithRouter() {
  render(
    <MemoryRouter initialEntries={['/peliculas/1/naves']}>
      <Routes>
        <Route
          path="/peliculas/:filmId/naves"
          element={<StarshipsTable starships={starships} />}
        />
        <Route path="/naves/:starshipId" element={<div>Detalle de la nave</div>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('StarshipsTable', () => {
  it('muestra el nombre y el modelo de la nave', () => {
    renderWithRouter()
    expect(screen.getAllByText(/CR90 corvette/)[0]).toBeInTheDocument()
    expect(screen.getAllByText(/corvette/)[0]).toBeInTheDocument()
  })

  it('abre el detalle al hacer clic en la fila', async () => {
    renderWithRouter()
    await userEvent.click(screen.getAllByText('CR90 corvette')[0])
    expect(screen.getByText('Detalle de la nave')).toBeInTheDocument()
  })

  it('abre el detalle al pulsar el botón "Ver más"', async () => {
    renderWithRouter()
    await userEvent.click(screen.getAllByRole('button', { name: 'Ver más' })[0])
    expect(screen.getByText('Detalle de la nave')).toBeInTheDocument()
  })
})
