import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DetailList } from '@/components/molecules/DetailList'

describe('DetailList', () => {
  it('renderiza las etiquetas y valores', () => {
    render(
      <DetailList
        items={[
          { label: 'Modelo', value: 'T-65 X-wing' },
          { label: 'Clase', value: 'Starfighter' },
        ]}
      />,
    )
    expect(screen.getByText('Modelo')).toBeInTheDocument()
    expect(screen.getByText('T-65 X-wing')).toBeInTheDocument()
    expect(screen.getByText('Clase')).toBeInTheDocument()
  })

  it('muestra un guion cuando el valor está vacío', () => {
    render(<DetailList items={[{ label: 'Pasajeros', value: '' }]} />)
    expect(screen.getByText('—')).toBeInTheDocument()
  })
})
