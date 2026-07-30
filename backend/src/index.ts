import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'swapi-backend' })
})

app.listen(PORT, () => {
  console.log(`🚀 Backend escuchando en http://localhost:${PORT}`)
})
