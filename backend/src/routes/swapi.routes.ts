import { Router } from 'express'
import {
  listFilms,
  getFilmById,
  listFilmStarships,
  getStarshipById,
} from '../controllers/swapi.controller.js'

const router = Router()

/**
 * @openapi
 * components:
 *   schemas:
 *     Film:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         title: { type: string, example: "A New Hope" }
 *         episode: { type: integer, example: 4 }
 *         director: { type: string }
 *         producer: { type: string }
 *         releaseDate: { type: string, example: "1977-05-25" }
 *         openingCrawl: { type: string }
 *         starshipCount: { type: integer, example: 8 }
 *     SwapiStarship:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 12 }
 *         name: { type: string, example: "X-wing" }
 *         model: { type: string }
 *         manufacturer: { type: string }
 *         starshipClass: { type: string }
 *         costInCredits: { type: string }
 *         length: { type: string }
 *         crew: { type: string }
 *         passengers: { type: string }
 *         maxAtmospheringSpeed: { type: string }
 *         cargoCapacity: { type: string }
 *         hyperdriveRating: { type: string }
 *         consumables: { type: string }
 */

/**
 * @openapi
 * /api/swapi/films:
 *   get:
 *     summary: Lista las películas de Star Wars (ordenadas por episodio)
 *     tags: [SWAPI]
 *     responses:
 *       200:
 *         description: Lista de películas
 *         content:
 *           application/json:
 *             schema: { type: array, items: { $ref: '#/components/schemas/Film' } }
 */
router.get('/films', listFilms)

/**
 * @openapi
 * /api/swapi/films/{id}:
 *   get:
 *     summary: Obtiene una película por id
 *     tags: [SWAPI]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Película
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Film' }
 *       404: { description: Película no encontrada }
 */
router.get('/films/:id', getFilmById)

/**
 * @openapi
 * /api/swapi/films/{id}/starships:
 *   get:
 *     summary: Naves que aparecen en una película
 *     tags: [SWAPI]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Lista de naves de la película
 *         content:
 *           application/json:
 *             schema: { type: array, items: { $ref: '#/components/schemas/SwapiStarship' } }
 *       404: { description: Película no encontrada }
 */
router.get('/films/:id/starships', listFilmStarships)

/**
 * @openapi
 * /api/swapi/starships/{id}:
 *   get:
 *     summary: Obtiene el detalle de una nave por id
 *     tags: [SWAPI]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Detalle de la nave
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/SwapiStarship' }
 *       404: { description: Nave no encontrada }
 */
router.get('/starships/:id', getStarshipById)

export default router
