import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PageHeader } from '@/components/molecules/PageHeader'

describe('PageHeader', () => {
  it('muestra el título', () => {
    render(<PageHeader title="Películas" />)
    expect(
      screen.getByRole('heading', { name: 'Películas' }),
    ).toBeInTheDocument()
  })

  it('muestra el subtítulo cuando se proporciona', () => {
    render(<PageHeader title="Películas" subtitle="Listado de películas" />)
    expect(screen.getByText('Listado de películas')).toBeInTheDocument()
  })

  it('no muestra subtítulo cuando no se proporciona', () => {
    const { container } = render(<PageHeader title="Solo título" />)
    expect(container.querySelectorAll('p')).toHaveLength(0)
  })
})
