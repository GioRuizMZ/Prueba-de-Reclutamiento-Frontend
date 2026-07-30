import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../src/app.js'
import { prisma } from '../src/lib/prisma.js'

// Limpia la tabla antes de cada prueba para tener un estado conocido.
beforeAll(async () => {
  await prisma.starship.deleteMany()
})

beforeEach(async () => {
  await prisma.starship.deleteMany()
})

afterAll(async () => {
  await prisma.starship.deleteMany()
  await prisma.$disconnect()
})

const validPayload = {
  name: 'X-wing',
  model: 'T-65 X-wing',
  maxAtmospheringSpeed: '1050',
  manufacturer: 'Incom Corporation',
}

describe('GET /health', () => {
  it('responde ok', async () => {
    const res = await request(app).get('/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('ok')
  })
})

describe('POST /api/starships', () => {
  it('crea una nave y devuelve 201 con id', async () => {
    const res = await request(app).post('/api/starships').send(validPayload)
    expect(res.status).toBe(201)
    expect(res.body.id).toBeTypeOf('number')
    expect(res.body.name).toBe('X-wing')
    expect(res.body.maxAtmospheringSpeed).toBe('1050')
  })

  it('rechaza payload inválido con 400 y errores', async () => {
    const res = await request(app).post('/api/starships').send({ model: 'x' })
    expect(res.status).toBe(400)
    expect(res.body.errors.name).toBeDefined()
  })
})

describe('GET /api/starships', () => {
  it('lista las naves guardadas', async () => {
    await prisma.starship.create({ data: validPayload })
    const res = await request(app).get('/api/starships')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body).toHaveLength(1)
  })
})

describe('GET /api/starships/:id', () => {
  it('devuelve la nave por id', async () => {
    const created = await prisma.starship.create({ data: validPayload })
    const res = await request(app).get(`/api/starships/${created.id}`)
    expect(res.status).toBe(200)
    expect(res.body.id).toBe(created.id)
  })

  it('devuelve 404 si no existe', async () => {
    const res = await request(app).get('/api/starships/999999')
    expect(res.status).toBe(404)
  })

  it('devuelve 400 si el id no es numérico', async () => {
    const res = await request(app).get('/api/starships/abc')
    expect(res.status).toBe(400)
  })
})

describe('PUT /api/starships/:id', () => {
  it('actualiza una nave existente', async () => {
    const created = await prisma.starship.create({ data: validPayload })
    const res = await request(app)
      .put(`/api/starships/${created.id}`)
      .send({ maxAtmospheringSpeed: '1200' })
    expect(res.status).toBe(200)
    expect(res.body.maxAtmospheringSpeed).toBe('1200')
  })

  it('devuelve 404 al actualizar una nave inexistente', async () => {
    const res = await request(app)
      .put('/api/starships/999999')
      .send({ maxAtmospheringSpeed: '1200' })
    expect(res.status).toBe(404)
  })
})

describe('DELETE /api/starships/:id', () => {
  it('elimina una nave y luego devuelve 404', async () => {
    const created = await prisma.starship.create({ data: validPayload })
    const del = await request(app).delete(`/api/starships/${created.id}`)
    expect(del.status).toBe(204)

    const res = await request(app).get(`/api/starships/${created.id}`)
    expect(res.status).toBe(404)
  })
})
