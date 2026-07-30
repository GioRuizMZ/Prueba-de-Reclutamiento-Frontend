# Prueba de Reclutamiento - Improntad (Fullstack)

Aplicación web que consume la **SWAPI** ([swapi.info](https://swapi.info)) para listar películas y naves de Star Wars, con un backend propio y CRUD sobre una base de datos.

## Estructura

```
.
├── frontend/   -> React + Vite + TypeScript + Tailwind (Atomic Design)
└── backend/    -> Node + Express + TypeScript + Prisma + MySQL
```

Los dos proyectos están **desacoplados**: cada uno tiene sus propias dependencias y se ejecuta por separado.

## Frontend

```bash
cd frontend
npm install
npm run dev     # servidor de desarrollo (Vite)
npm test        # pruebas de componentes (Vitest + Testing Library)
```

Estructura por **Atomic Design**: `components/{atoms,molecules,organisms,templates}`, `pages/`, `router/`, `config/`.

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
- API de naves (CRUD propio): `/api/starships`
- Proxy a SWAPI: `/api/swapi/films`, `/api/swapi/films/:id/starships`, `/api/swapi/starships/:id`
- Documentación Swagger: `/api/docs`

El frontend consume SWAPI **a través del backend** (patrón BFF): el backend orquesta las llamadas a swapi.info y expone una sola superficie de API.

### Pruebas (backend)

Usan Vitest + Supertest contra una base de datos separada (`swapi_test`):

```bash
# crear la BD de test y aplicar la migración una sola vez
mysql -u root -e "CREATE DATABASE IF NOT EXISTS swapi_test"
DATABASE_URL="mysql://root@localhost:3306/swapi_test" npm run prisma:deploy

npm test        # corre las pruebas unitarias y de integración
```

## Tecnologías

- **Frontend:** React, Vite, TypeScript
- **Backend:** Node, Express, TypeScript
- **ORM / Base de datos:** Prisma + MySQL
- **Validación:** Zod
- **Pruebas:** Vitest + Supertest
- **Documentación:** Swagger (swagger-jsdoc + swagger-ui-express)
- **Despliegue:** Railway

## Despliegue en Railway

Se crean 3 servicios en un mismo proyecto, todos desde el repo de GitHub:

### 1. MySQL

`New > Database > Add MySQL`. Railway genera la variable `DATABASE_URL`.

### 2. Backend (root: `backend/`)

- En el servicio: *Settings > Root Directory* = `backend`.
- Variables:
  - `DATABASE_URL` = referencia a la del servicio MySQL (`${{MySQL.DATABASE_URL}}`).
  - `SWAPI_BASE_URL` = `https://swapi.info/api` (opcional).
- Railway usa los scripts del `package.json`:
  - install → `postinstall` genera el cliente Prisma.
  - build → `tsc`.
  - start → aplica migraciones (`prisma migrate deploy`) y arranca el servidor.
- Genera *Public Networking* para obtener la URL pública del backend.

### 3. Frontend (root: `frontend/`)

- *Settings > Root Directory* = `frontend`.
- Variable (en build):
  - `VITE_API_URL` = URL pública del backend (paso 2).
- start → `serve -s dist` (sirve el build estático con fallback a `index.html`).

## Ramas

- `main` - base estable
- `develop` - integración de features
- `feature-backend-*` / `feature-front-*` - una rama por feature
