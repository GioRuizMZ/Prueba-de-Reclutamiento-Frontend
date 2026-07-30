import { describe, it, expect, vi, afterEach } from 'vitest'
import request from 'supertest'
import { app } from '../src/app.js'

// Respuestas simuladas de SWAPI mapeadas por fragmento de URL.
function stubFetch(map: Record<string, unknown>) {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url: string) => {
      const key = Object.keys(map).find((k) => String(url).endsWith(k))
      if (!key) {
        return { ok: false, status: 404, json: async () => ({}) } as Response
      }
      return {
        ok: true,
        status: 200,
        json: async () => map[key],
      } as Response
    }),
  )
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('GET /api/swapi/films', () => {
  it('devuelve las películas ordenadas por episodio', async () => {
    stubFetch({
      '/films': [
        { episode_id: 4, title: 'A New Hope', url: 'x/4', starships: [] },
        { episode_id: 1, title: 'The Phantom Menace', url: 'x/1', starships: [] },
      ],
    })

    const res = await request(app).get('/api/swapi/films')
    expect(res.status).toBe(200)
    expect(res.body.map((f: { episode_id: number }) => f.episode_id)).toEqual([
      1, 4,
    ])
  })
})

describe('GET /api/swapi/starships/:id', () => {
  it('devuelve el detalle de la nave', async () => {
    stubFetch({ '/starships/9': { name: 'Death Star', model: 'DS-1' } })
    const res = await request(app).get('/api/swapi/starships/9')
    expect(res.status).toBe(200)
    expect(res.body.name).toBe('Death Star')
  })

  it('propaga 404 cuando SWAPI no encuentra el recurso', async () => {
    stubFetch({}) // cualquier URL -> 404
    const res = await request(app).get('/api/swapi/starships/99999')
    expect(res.status).toBe(404)
  })
})

describe('GET /api/swapi/films/:id/starships', () => {
  it('resuelve y devuelve las naves de la película', async () => {
    stubFetch({
      '/films/1': {
        title: 'A New Hope',
        episode_id: 4,
        starships: [
          'https://swapi.info/api/starships/2',
          'https://swapi.info/api/starships/3',
        ],
        url: 'https://swapi.info/api/films/1',
      },
      '/starships/2': { name: 'CR90 corvette', url: 'x/2' },
      '/starships/3': { name: 'Star Destroyer', url: 'x/3' },
    })

    const res = await request(app).get('/api/swapi/films/1/starships')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(2)
    expect(res.body.map((s: { name: string }) => s.name)).toEqual([
      'CR90 corvette',
      'Star Destroyer',
    ])
  })
})
