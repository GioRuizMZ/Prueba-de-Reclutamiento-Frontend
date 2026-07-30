import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { StarshipFormPage } from '@/pages/StarshipFormPage'
import {
  createSavedStarship,
  updateSavedStarship,
} from '@/services/savedStarships.service'
import type { Starship } from '@/types/swapi'

vi.mock('@/services/savedStarships.service', () => ({
  createSavedStarship: vi.fn(),
  updateSavedStarship: vi.fn(),
}))
// Evita llamadas reales si faltara el state.
vi.mock('@/services/starships.service', () => ({
  getStarship: vi.fn(),
}))

const mockCreate = vi.mocked(createSavedStarship)
const mockUpdate = vi.mocked(updateSavedStarship)

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
  beforeEach(() => {
    mockCreate.mockReset()
    mockUpdate.mockReset()
  })

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

  it('al editar de nuevo actualiza la misma nave (PUT) en vez de crear otra', async () => {
    mockCreate.mockResolvedValue({
      id: 7,
      name: 'X-wing',
      model: 'T-65 X-wing',
      maxAtmospheringSpeed: '1050',
      createdAt: '',
      updatedAt: '',
    })
    mockUpdate.mockResolvedValue({
      id: 7,
      name: 'X-wing',
      model: 'T-65 X-wing',
      maxAtmospheringSpeed: '1200',
      createdAt: '',
      updatedAt: '',
    })

    renderPage()
    // Primer guardado -> crea
    await userEvent.click(await screen.findByRole('button', { name: 'Guardar' }))
    await screen.findByText('¡Nave guardada!')
    expect(mockCreate).toHaveBeenCalledOnce()

    // Editar de nuevo -> vuelve al formulario y guarda -> actualiza (no crea)
    await userEvent.click(screen.getByRole('button', { name: 'Editar de nuevo' }))
    await userEvent.click(await screen.findByRole('button', { name: 'Guardar' }))
    await screen.findByText('¡Nave guardada!')

    expect(mockUpdate).toHaveBeenCalledWith(7, expect.any(Object))
    expect(mockCreate).toHaveBeenCalledOnce() // no se creó una segunda
  })
})
