import swaggerJSDoc from 'swagger-jsdoc'

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SWAPI Backend · Prueba Improntad',
      version: '1.0.0',
      description:
        'API propia con CRUD de naves de Star Wars guardadas desde el formulario.',
    },
    tags: [{ name: 'Starships', description: 'Operaciones sobre naves' }],
  },
  // Lee las anotaciones tanto en desarrollo (.ts) como en producción (.js)
  apis: ['./src/routes/*.ts', './dist/routes/*.js'],
}

export const swaggerSpec = swaggerJSDoc(options)
