import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger.js'
import starshipRoutes from './routes/starship.routes.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Healthcheck
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'swapi-backend' })
})

// Rutas de la API
app.use('/api/starships', starshipRoutes)

// Documentación Swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.get('/api/docs.json', (_req, res) => res.json(swaggerSpec))

app.listen(PORT, () => {
  console.log(`Backend en http://localhost:${PORT}`)
  console.log(`Swagger en http://localhost:${PORT}/api/docs`)
})
