import { PageHeader } from '@/components/molecules/PageHeader'
import { Spinner } from '@/components/atoms/Spinner'
import { StateMessage } from '@/components/molecules/StateMessage'
import { FilmsTable } from '@/components/organisms/FilmsTable'
import { useAsync } from '@/hooks/useAsync'
import { getFilms } from '@/services/films.service'

// Pantalla 1: listado de todas las películas de Star Wars.
export function FilmsPage() {
  const { data: films, loading, error } = useAsync(getFilms)

  return (
    <div>
      <PageHeader
        title="Películas"
        subtitle="Listado de películas de Star Wars"
      />

      {loading && <Spinner label="Cargando películas..." />}

      {!loading && error && (
        <StateMessage
          variant="error"
          title="No se pudieron cargar las películas"
          description={error}
        />
      )}

      {!loading && !error && films && films.length === 0 && (
        <StateMessage title="No hay películas para mostrar" />
      )}

      {!loading && !error && films && films.length > 0 && (
        <FilmsTable films={films} />
      )}
    </div>
  )
}
