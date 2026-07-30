import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Corre las pruebas contra una base de datos separada para no tocar la de desarrollo.
    env: {
      DATABASE_URL: 'mysql://root@localhost:3306/swapi_test',
    },
    // Sin paralelismo entre archivos: comparten la misma tabla.
    fileParallelism: false,
  },
})
