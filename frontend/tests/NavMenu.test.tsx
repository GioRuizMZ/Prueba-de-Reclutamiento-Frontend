import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { NavMenu } from '@/components/molecules/NavMenu'
import { NAV_ITEMS } from '@/config/navigation'

describe('NavMenu', () => {
  it('renderiza todos los enlaces con su destino correcto', () => {
    render(
      <MemoryRouter>
        <NavMenu variant="navbar" />
      </MemoryRouter>,
    )

    for (const item of NAV_ITEMS) {
      const link = screen.getByRole('link', { name: item.label })
      expect(link).toHaveAttribute('href', item.to)
    }
  })

  it('llama onItemClick al pulsar un enlace (cierra el sidebar en móvil)', async () => {
    const onItemClick = vi.fn()
    render(
      <MemoryRouter>
        <NavMenu variant="sidebar" onItemClick={onItemClick} />
      </MemoryRouter>,
    )

    await userEvent.click(screen.getByRole('link', { name: NAV_ITEMS[0].label }))
    expect(onItemClick).toHaveBeenCalledOnce()
  })
})
