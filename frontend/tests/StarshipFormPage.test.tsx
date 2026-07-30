import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { StarshipFormPage } from '@/pages/StarshipFormPage'
import { createSavedStarship } from '@/services/savedStarships.service'
import type { Starship } from '@/types/swapi'

vi.mock('@/services/savedStarships.service', () => ({
  createSavedStarship: vi.fn(),
}))
// Evita llamadas reales si faltara el state.
vi.mock('@/services/starships.service', () => ({
  getStarship: vi.fn(),
}))

const mockCreate = vi.mocked(createSavedStarship)

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
    <MemoryRouter
      initialEntries={[
        { pathname: '/naves/12/formulario', state: { starship: ship } },
      ]}
    >
      <Routes>
        <Route path="/naves/:starshipId/formulario" element={<StarshipFormPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('StarshipFormPage', () => {
  beforeEach(() => mockCreate.mockReset())

  it('prellena el formulario con la nave recibida por state', async () => {
    renderPage()
    expect(await screen.findByLabelText('Nombre')).toHaveValue('X-wing')
    expect(screen.getByLabelText('Velocidad atmosférica')).toHaveValue('1050')
  })

  it('guarda la nave y muestra la confirmación', async () => {
    mockCreate.mockResolvedValue({
      id: 1,
      name: 'X-wing',
      model: 'T-65 X-wing',
      maxAtmospheringSpeed: '1050',
      createdAt: '',
      updatedAt: '',
    })

    renderPage()
    await userEvent.click(await screen.findByRole('button', { name: 'Guardar' }))

    expect(await screen.findByText('¡Nave guardada!')).toBeInTheDocument()
    expect(mockCreate).toHaveBeenCalledWith({
      name: 'X-wing',
      model: 'T-65 X-wing',
      maxAtmospheringSpeed: '1050',
    })
  })
})
