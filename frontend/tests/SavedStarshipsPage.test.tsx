import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { SavedStarshipsPage } from '@/pages/SavedStarshipsPage'
import {
  getSavedStarships,
  deleteSavedStarship,
} from '@/services/savedStarships.service'
import type { SavedStarship } from '@/types/savedStarship'

vi.mock('@/services/savedStarships.service', () => ({
  getSavedStarships: vi.fn(),
  deleteSavedStarship: vi.fn(),
}))

const mockGet = vi.mocked(getSavedStarships)
const mockDelete = vi.mocked(deleteSavedStarship)

const ship: SavedStarship = {
  id: 1,
  name: 'Millennium Falcon',
  model: 'YT-1300',
  maxAtmospheringSpeed: '1050',
  createdAt: '',
  updatedAt: '',
}

function renderPage() {
  render(
    <MemoryRouter>
      <SavedStarshipsPage />
    </MemoryRouter>,
  )
}

describe('SavedStarshipsPage', () => {
  beforeEach(() => {
    mockGet.mockReset()
    mockDelete.mockReset()
  })

  it('lista las naves guardadas', async () => {
    mockGet.mockResolvedValue([ship])
    renderPage()
    expect(
      (await screen.findAllByText('Millennium Falcon'))[0],
    ).toBeInTheDocument()
  })

  it('muestra un mensaje cuando no hay naves guardadas', async () => {
    mockGet.mockResolvedValue([])
    renderPage()
    expect(
      await screen.findByText('Todavía no has guardado ninguna nave'),
    ).toBeInTheDocument()
  })

  it('elimina una nave y refresca la lista', async () => {
    // Primera carga con la nave; tras borrar, lista vacía.
    mockGet.mockResolvedValueOnce([ship]).mockResolvedValueOnce([])
    mockDelete.mockResolvedValue()

    renderPage()
    await userEvent.click(
      (await screen.findAllByRole('button', { name: 'Eliminar' }))[0],
    )

    expect(mockDelete).toHaveBeenCalledWith(1)
    expect(
      await screen.findByText('Todavía no has guardado ninguna nave'),
    ).toBeInTheDocument()
  })
})
