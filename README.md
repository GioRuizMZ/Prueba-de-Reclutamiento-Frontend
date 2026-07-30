# Prueba de Reclutamiento - Improntad (Fullstack)

Aplicación web que consume la **SWAPI** ([swapi.info](https://swapi.info)) para listar películas y naves de Star Wars, con un backend propio y CRUD sobre una base de datos.

## Estructura

```
.
├── frontend/   -> React + Vite + TypeScript (+ Tailwind, proximamente)
└── backend/    -> Node + Express + TypeScript + Prisma + MySQL
```

Los dos proyectos están **desacoplados**: cada uno tiene sus propias dependencias y se ejecuta por separado.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend

```bash
cd backend
npm install
cp .env.example .env    # completar DATABASE_URL con tu MySQL
npm run prisma:migrate  # crea la tabla en la base de datos
npm run dev
```

- Servidor: `http://localhost:3000`
- Healthcheck: `GET /health`
- API de naves (CRUD): `/api/starships`
- Documentación Swagger: `/api/docs`

## Tecnologías

- **Frontend:** React, Vite, TypeScript
- **Backend:** Node, Express, TypeScript
- **ORM / Base de datos:** Prisma + MySQL
- **Validación:** Zod
- **Documentación:** Swagger (swagger-jsdoc + swagger-ui-express)
- **Despliegue:** Railway

## Ramas

- `main` - base estable
- `develop` - integración de features
- `feature-backend-*` / `feature-front-*` - una rama por feature
