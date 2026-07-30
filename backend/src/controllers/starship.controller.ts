import type { Request, Response } from 'express'
import { prisma } from '../lib/prisma.js'
import {
  createStarshipSchema,
  updateStarshipSchema,
} from '../schemas/starship.schema.js'

// GET /api/starships  → listar todas
export async function getStarships(_req: Request, res: Response) {
  const starships = await prisma.starship.findMany({
    orderBy: { createdAt: 'desc' },
  })
  res.json(starships)
}

// GET /api/starships/:id  → obtener una por id
export async function getStarshipById(req: Request, res: Response) {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'El id debe ser numérico' })
  }

  const starship = await prisma.starship.findUnique({ where: { id } })
  if (!starship) {
    return res.status(404).json({ error: 'Nave no encontrada' })
  }
  res.json(starship)
}

// POST /api/starships  → crear (procesa el formulario)
export async function createStarship(req: Request, res: Response) {
  const parsed = createStarshipSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors })
  }

  const starship = await prisma.starship.create({ data: parsed.data })
  res.status(201).json(starship)
}

// PUT /api/starships/:id  → actualizar
export async function updateStarship(req: Request, res: Response) {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'El id debe ser numérico' })
  }

  const parsed = updateStarshipSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors })
  }

  const exists = await prisma.starship.findUnique({ where: { id } })
  if (!exists) {
    return res.status(404).json({ error: 'Nave no encontrada' })
  }

  const starship = await prisma.starship.update({
    where: { id },
    data: parsed.data,
  })
  res.json(starship)
}

// DELETE /api/starships/:id  → eliminar
export async function deleteStarship(req: Request, res: Response) {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: 'El id debe ser numérico' })
  }

  const exists = await prisma.starship.findUnique({ where: { id } })
  if (!exists) {
    return res.status(404).json({ error: 'Nave no encontrada' })
  }

  await prisma.starship.delete({ where: { id } })
  res.status(204).send()
}
