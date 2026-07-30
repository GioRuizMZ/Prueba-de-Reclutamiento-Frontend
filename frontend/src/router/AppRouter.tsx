import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainLayout } from '@/components/templates/MainLayout'
import { FilmsPage } from '@/pages/FilmsPage'
import { FilmStarshipsPage } from '@/pages/FilmStarshipsPage'
import { StarshipDetailPage } from '@/pages/StarshipDetailPage'
import { StarshipFormPage } from '@/pages/StarshipFormPage'
import { SavedStarshipsPage } from '@/pages/SavedStarshipsPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <FilmsPage /> },
      { path: 'peliculas/:filmId/naves', element: <FilmStarshipsPage /> },
      { path: 'naves/:starshipId', element: <StarshipDetailPage /> },
      { path: 'naves/:starshipId/formulario', element: <StarshipFormPage /> },
      { path: 'naves-guardadas', element: <SavedStarshipsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
