import { useParams, useLocation } from 'react-router-dom'
import { PageHeader } from '@/components/molecules/PageHeader'
import { BackLink } from '@/components/atoms/BackLink'
import { Spinner } from '@/components/atoms/Spinner'
import { StateMessage } from '@/components/molecules/StateMessage'
import { StarshipsTable } from '@/components/organisms/StarshipsTable'
import { useAsync } from '@/hooks/useAsync'
import { getFilmStarships } from '@/services/starships.service'

// Pantalla 2: naves que aparecen en la película seleccionada.
export function FilmStarshipsPage() {
  const { filmId } = useParams<{ filmId: string }>()
  const location = useLocation()
  const filmTitle = (location.state as { filmTitle?: string } | null)?.filmTitle

  const {
    data: starships,
    loading,
    error,
  } = useAsync(() => getFilmStarships(filmId!), [filmId])

  return (
    <div>
      <BackLink to="/" label="Volver a películas" />
      <PageHeader
        title="Naves de la película"
        subtitle={filmTitle ?? 'Naves que aparecen en la película'}
      />

      {loading && <Spinner label="Cargando naves..." />}

      {!loading && error && (
        <StateMessage
          variant="error"
          title="No se pudieron cargar las naves"
          description={error}
        />
      )}

      {!loading && !error && starships && starships.length === 0 && (
        <StateMessage
          title="Esta película no tiene naves registradas"
          description="Prueba con otra película."
        />
      )}

      {!loading && !error && starships && starships.length > 0 && (
        <StarshipsTable starships={starships} />
      )}
    </div>
  )
}
