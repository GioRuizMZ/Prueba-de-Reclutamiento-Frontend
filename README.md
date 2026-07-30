# Prueba de Reclutamiento — Improntad (Fullstack)

Aplicación web que consume la **SWAPI** ([swapi.info](https://swapi.info)) para listar películas y naves de Star Wars, con un backend propio y CRUD sobre una base de datos.

## Estructura

```
.
├── frontend/   → React + Vite + TypeScript (+ Tailwind, próximamente)
└── backend/    → Node + Express + TypeScript (+ Prisma + PostgreSQL, próximamente)
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
cp .env.example .env   # y completar DATABASE_URL
npm run dev
```

Servidor en `http://localhost:3000` — endpoint de prueba: `GET /health`.

## Tecnologías

- **Frontend:** React, Vite, TypeScript
- **Backend:** Node, Express, TypeScript
- **Base de datos:** PostgreSQL (Prisma)
- **Despliegue:** Railway

## Ramas

- `main` — base estable
- `develop` — desarrollo
