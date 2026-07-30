import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { StarshipDetail } from '@/components/organisms/StarshipDetail'
import type { Starship } from '@/types/swapi'

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

function renderDetail() {
  render(
    <MemoryRouter initialEntries={['/naves/12']}>
      <Routes>
        <Route path="/naves/:starshipId" element={<StarshipDetail starship={ship} />} />
        <Route
          path="/naves/:starshipId/formulario"
          element={<div>Formulario de la nave</div>}
        />
      </Routes>
    </MemoryRouter>,
  )
}

describe('StarshipDetail', () => {
  it('muestra el nombre y datos primarios de la nave', () => {
    renderDetail()
    expect(screen.getByRole('heading', { name: 'X-wing' })).toBeInTheDocument()
    expect(screen.getByText('Incom Corporation')).toBeInTheDocument()
    expect(screen.getByText('Starfighter')).toBeInTheDocument()
    expect(screen.getByText('1050')).toBeInTheDocument()
  })

  it('navega al formulario al pulsar "Editar datos"', async () => {
    renderDetail()
    await userEvent.click(screen.getByRole('button', { name: 'Editar datos' }))
    expect(screen.getByText('Formulario de la nave')).toBeInTheDocument()
  })

  it('oculta los campos sin información (unknown / n/a)', () => {
    render(
      <MemoryRouter>
        <StarshipDetail
          starship={{
            ...ship,
            hyperdriveRating: 'unknown',
            cargoCapacity: 'n/a',
            consumables: '',
          }}
        />
      </MemoryRouter>,
    )
    expect(screen.queryByText('Hiperimpulsor')).not.toBeInTheDocument()
    expect(screen.queryByText('Capacidad de carga')).not.toBeInTheDocument()
    expect(screen.queryByText('Consumibles')).not.toBeInTheDocument()
    // Los campos con dato sí se muestran
    expect(screen.getByText('Fabricante')).toBeInTheDocument()
  })
})
