import type { Request, Response } from 'express'
import { HttpError } from '../lib/httpError.js'
import {
  getFilms,
  getFilm,
  getFilmStarships,
  getStarship,
} from '../services/swapi.service.js'

// Envuelve un handler async y traduce HttpError al status correspondiente.
function handle(fn: (req: Request) => Promise<unknown>) {
  return async (req: Request, res: Response) => {
    try {
      const data = await fn(req)
      res.json(data)
    } catch (err) {
      if (err instanceof HttpError) {
        return res.status(err.status).json({ error: err.message })
      }
      res.status(500).json({ error: 'Error inesperado' })
    }
  }
}

export const listFilms = handle(() => getFilms())
export const getFilmById = handle((req) => getFilm(String(req.params.id)))
export const listFilmStarships = handle((req) =>
  getFilmStarships(String(req.params.id)),
)
export const getStarshipById = handle((req) => getStarship(String(req.params.id)))
