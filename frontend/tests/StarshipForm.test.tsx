import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StarshipForm } from '@/components/organisms/StarshipForm'

const validDefaults = {
  name: 'X-wing',
  model: 'T-65 X-wing',
  maxAtmospheringSpeed: '1050',
}

describe('StarshipForm', () => {
  it('prellena los campos con los valores por defecto', () => {
    render(<StarshipForm defaultValues={validDefaults} onSubmit={vi.fn()} />)
    expect(screen.getByLabelText('Nombre')).toHaveValue('X-wing')
    expect(screen.getByLabelText('Modelo')).toHaveValue('T-65 X-wing')
    expect(screen.getByLabelText('Velocidad atmosférica')).toHaveValue('1050')
  })

  it('envía los valores cuando el formulario es válido', async () => {
    const onSubmit = vi.fn()
    render(<StarshipForm defaultValues={validDefaults} onSubmit={onSubmit} />)
    await userEvent.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(onSubmit).toHaveBeenCalledOnce()
    expect(onSubmit.mock.calls[0][0]).toMatchObject(validDefaults)
  })

  it('muestra error si el nombre está vacío', async () => {
    const onSubmit = vi.fn()
    render(<StarshipForm defaultValues={validDefaults} onSubmit={onSubmit} />)
    await userEvent.clear(screen.getByLabelText('Nombre'))
    await userEvent.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(await screen.findByText('El nombre es obligatorio')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('muestra error si la velocidad no es numérica', async () => {
    const onSubmit = vi.fn()
    render(<StarshipForm defaultValues={validDefaults} onSubmit={onSubmit} />)
    const speed = screen.getByLabelText('Velocidad atmosférica')
    await userEvent.clear(speed)
    await userEvent.type(speed, 'rapido')
    await userEvent.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(
      await screen.findByText('La velocidad debe ser un número'),
    ).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })
})
