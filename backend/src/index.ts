import 'dotenv/config'
import { app } from './app.js'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Backend en http://localhost:${PORT}`)
  console.log(`Swagger en http://localhost:${PORT}/api/docs`)
})
