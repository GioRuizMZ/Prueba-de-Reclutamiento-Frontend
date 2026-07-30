import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SavedStarshipsTable } from '@/components/organisms/SavedStarshipsTable'
import type { SavedStarship } from '@/types/savedStarship'

const ships: SavedStarship[] = [
  {
    id: 1,
    name: 'Millennium Falcon',
    model: 'YT-1300',
    maxAtmospheringSpeed: '1050',
    createdAt: '',
    updatedAt: '',
  },
]

describe('SavedStarshipsTable', () => {
  it('muestra las naves guardadas', () => {
    render(<SavedStarshipsTable starships={ships} onDelete={vi.fn()} />)
    expect(screen.getAllByText('Millennium Falcon')[0]).toBeInTheDocument()
    expect(screen.getAllByText('YT-1300')[0]).toBeInTheDocument()
  })

  it('llama onDelete con el id al pulsar "Eliminar"', async () => {
    const onDelete = vi.fn()
    render(<SavedStarshipsTable starships={ships} onDelete={onDelete} />)
    await userEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[0])
    expect(onDelete).toHaveBeenCalledWith(1)
  })
})
