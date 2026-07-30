import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { MobileSidebar } from '@/components/organisms/MobileSidebar'

function renderSidebar(open: boolean, onClose = vi.fn()) {
  render(
    <MemoryRouter>
      <MobileSidebar open={open} onClose={onClose} />
    </MemoryRouter>,
  )
  return onClose
}

describe('MobileSidebar', () => {
  it('está marcado como oculto cuando open es false', () => {
    const { container } = render(
      <MemoryRouter>
        <MobileSidebar open={false} onClose={vi.fn()} />
      </MemoryRouter>,
    )
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('está visible cuando open es true', () => {
    const { container } = render(
      <MemoryRouter>
        <MobileSidebar open onClose={vi.fn()} />
      </MemoryRouter>,
    )
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'false')
  })

  it('muestra los enlaces de navegación', () => {
    renderSidebar(true)
    expect(screen.getByRole('link', { name: 'Películas' })).toBeInTheDocument()
  })

  it('llama onClose al pulsar un enlace', async () => {
    const onClose = renderSidebar(true)
    await userEvent.click(screen.getByRole('link', { name: 'Mis naves' }))
    expect(onClose).toHaveBeenCalled()
  })
})
