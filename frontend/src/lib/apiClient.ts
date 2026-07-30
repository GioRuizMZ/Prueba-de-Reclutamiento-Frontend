import axios from 'axios'

// Cliente HTTP hacia NUESTRO backend (patrón BFF).
// El backend orquesta las llamadas a SWAPI y expone los datos ya normalizados.
const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export const apiClient = axios.create({
  baseURL,
  timeout: 15000,
})
