import { describe, it, expect } from 'vitest'
import {
  createStarshipSchema,
  updateStarshipSchema,
} from '../src/schemas/starship.schema.js'

describe('createStarshipSchema', () => {
  it('acepta un payload válido', () => {
    const result = createStarshipSchema.safeParse({
      name: 'X-wing',
      model: 'T-65 X-wing',
      maxAtmospheringSpeed: '1050',
    })
    expect(result.success).toBe(true)
  })

  it('rechaza cuando faltan campos obligatorios y devuelve mensajes en español', () => {
    const result = createStarshipSchema.safeParse({})
    expect(result.success).toBe(false)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      expect(errors.name).toContain('El nombre es obligatorio')
      expect(errors.model).toContain('El modelo es obligatorio')
      expect(errors.maxAtmospheringSpeed).toContain('La velocidad es obligatoria')
    }
  })

  it('rechaza strings vacíos', () => {
    const result = createStarshipSchema.safeParse({
      name: '   ',
      model: '',
      maxAtmospheringSpeed: '',
    })
    expect(result.success).toBe(false)
  })

  it('rechaza una swapiUrl inválida', () => {
    const result = createStarshipSchema.safeParse({
      name: 'X-wing',
      model: 'T-65',
      maxAtmospheringSpeed: '1050',
      swapiUrl: 'no-es-una-url',
    })
    expect(result.success).toBe(false)
  })
})

describe('updateStarshipSchema', () => {
  it('permite actualizaciones parciales', () => {
    const result = updateStarshipSchema.safeParse({ maxAtmospheringSpeed: '1200' })
    expect(result.success).toBe(true)
  })
})
