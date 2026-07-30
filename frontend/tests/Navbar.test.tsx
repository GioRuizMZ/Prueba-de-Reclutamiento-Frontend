import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Navbar } from '@/components/organisms/Navbar'

function renderNavbar(sidebarOpen = false) {
  return render(
    <MemoryRouter>
      <Navbar sidebarOpen={sidebarOpen} onToggleSidebar={vi.fn()} />
    </MemoryRouter>,
  )
}

describe('Navbar', () => {
  it('muestra el logo de Star Wars', () => {
    renderNavbar()
    expect(screen.getByAltText('Star Wars')).toBeInTheDocument()
  })

  it('muestra el título del proyecto centrado', () => {
    renderNavbar()
    expect(screen.getByText('Prueba frontend')).toBeInTheDocument()
  })

  it('muestra los enlaces de navegación', () => {
    renderNavbar()
    expect(screen.getByRole('link', { name: 'Películas' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Mis naves' })).toBeInTheDocument()
  })

  it('el botón de menú refleja el estado del sidebar', () => {
    renderNavbar(false)
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toBeInTheDocument()
  })
})
