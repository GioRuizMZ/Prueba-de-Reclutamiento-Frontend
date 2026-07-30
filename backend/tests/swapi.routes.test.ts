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
  it('devuelve las películas ordenadas por episodio y normalizadas (DTO)', async () => {
    stubFetch({
      '/films': [
        {
          episode_id: 4,
          title: 'A New Hope',
          url: 'https://swapi.info/api/films/1',
          starships: ['a', 'b'],
          director: 'George Lucas',
          producer: 'Gary Kurtz',
          release_date: '1977-05-25',
          opening_crawl: '',
        },
        {
          episode_id: 1,
          title: 'The Phantom Menace',
          url: 'https://swapi.info/api/films/4',
          starships: [],
          director: 'George Lucas',
          producer: 'Rick McCallum',
          release_date: '1999-05-19',
          opening_crawl: '',
        },
      ],
    })

    const res = await request(app).get('/api/swapi/films')
    expect(res.status).toBe(200)
    // Ordenadas por episodio ascendente
    expect(res.body.map((f: { episode: number }) => f.episode)).toEqual([1, 4])
    // Forma normalizada (camelCase, con id, sin snake_case)
    const first = res.body[0]
    expect(first).toMatchObject({ id: 4, title: 'The Phantom Menace', episode: 1 })
    expect(first).not.toHaveProperty('episode_id')
  })
})

describe('GET /api/swapi/starships/:id', () => {
  it('devuelve el detalle de la nave normalizado', async () => {
    stubFetch({
      '/starships/9': {
        name: 'Death Star',
        model: 'DS-1',
        max_atmosphering_speed: 'n/a',
        starship_class: 'Deep Space Mobile Battlestation',
        url: 'https://swapi.info/api/starships/9',
      },
    })
    const res = await request(app).get('/api/swapi/starships/9')
    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({
      id: 9,
      name: 'Death Star',
      starshipClass: 'Deep Space Mobile Battlestation',
    })
    expect(res.body).not.toHaveProperty('starship_class')
  })

  it('propaga 404 cuando SWAPI no encuentra el recurso', async () => {
    stubFetch({})
    const res = await request(app).get('/api/swapi/starships/99999')
    expect(res.status).toBe(404)
  })
})

describe('GET /api/swapi/films/:id/starships', () => {
  it('resuelve y devuelve las naves de la película normalizadas', async () => {
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
      '/starships/2': {
        name: 'CR90 corvette',
        url: 'https://swapi.info/api/starships/2',
      },
      '/starships/3': {
        name: 'Star Destroyer',
        url: 'https://swapi.info/api/starships/3',
      },
    })

    const res = await request(app).get('/api/swapi/films/1/starships')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(2)
    expect(res.body.map((s: { name: string }) => s.name)).toEqual([
      'CR90 corvette',
      'Star Destroyer',
    ])
    expect(res.body.map((s: { id: number }) => s.id)).toEqual([2, 3])
  })
})
