import { Router } from 'express'
import {
  getStarships,
  getStarshipById,
  createStarship,
  updateStarship,
  deleteStarship,
} from '../controllers/starship.controller.js'

const router = Router()

/**
 * @openapi
 * components:
 *   schemas:
 *     Starship:
 *       type: object
 *       properties:
 *         id: { type: integer, example: 1 }
 *         name: { type: string, example: "X-wing" }
 *         model: { type: string, example: "T-65 X-wing" }
 *         maxAtmospheringSpeed: { type: string, example: "1050" }
 *         manufacturer: { type: string, nullable: true }
 *         starshipClass: { type: string, nullable: true }
 *         crew: { type: string, nullable: true }
 *         passengers: { type: string, nullable: true }
 *         costInCredits: { type: string, nullable: true }
 *         swapiUrl: { type: string, nullable: true }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *     StarshipInput:
 *       type: object
 *       required: [name, model, maxAtmospheringSpeed]
 *       properties:
 *         name: { type: string, example: "X-wing" }
 *         model: { type: string, example: "T-65 X-wing" }
 *         maxAtmospheringSpeed: { type: string, example: "1050" }
 *         manufacturer: { type: string }
 *         starshipClass: { type: string }
 *         crew: { type: string }
 *         passengers: { type: string }
 *         costInCredits: { type: string }
 *         swapiUrl: { type: string }
 */

/**
 * @openapi
 * /api/starships:
 *   get:
 *     summary: Lista todas las naves guardadas
 *     tags: [Starships]
 *     responses:
 *       200:
 *         description: Lista de naves
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Starship' }
 *   post:
 *     summary: Crea una nave (procesa el formulario)
 *     tags: [Starships]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/StarshipInput' }
 *     responses:
 *       201:
 *         description: Nave creada
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Starship' }
 *       400: { description: Datos inválidos }
 */
router.get('/', getStarships)
router.post('/', createStarship)

/**
 * @openapi
 * /api/starships/{id}:
 *   get:
 *     summary: Obtiene una nave por id
 *     tags: [Starships]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Nave encontrada
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Starship' }
 *       404: { description: Nave no encontrada }
 *   put:
 *     summary: Actualiza una nave por id
 *     tags: [Starships]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/StarshipInput' }
 *     responses:
 *       200:
 *         description: Nave actualizada
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Starship' }
 *       400: { description: Datos inválidos }
 *       404: { description: Nave no encontrada }
 *   delete:
 *     summary: Elimina una nave por id
 *     tags: [Starships]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204: { description: Nave eliminada }
 *       404: { description: Nave no encontrada }
 */
router.get('/:id', getStarshipById)
router.put('/:id', updateStarship)
router.delete('/:id', deleteStarship)

export default router
