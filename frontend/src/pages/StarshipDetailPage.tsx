import { useParams, useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/molecules/PageHeader'
import { Spinner } from '@/components/atoms/Spinner'
import { StateMessage } from '@/components/molecules/StateMessage'
import { StarshipDetail } from '@/components/organisms/StarshipDetail'
import { BackLink } from '@/components/atoms/BackLink'
import { Button } from '@/components/atoms/Button'
import { useAsync } from '@/hooks/useAsync'
import { getStarship } from '@/services/starships.service'

// Pantalla 3: detalles primarios de la nave consultada.
export function StarshipDetailPage() {
  const { starshipId } = useParams<{ starshipId: string }>()
  const navigate = useNavigate()

  const {
    data: starship,
    loading,
    error,
  } = useAsync(() => getStarship(starshipId!), [starshipId])

  return (
    <div>
      <BackLink label="Volver" />

      <PageHeader
        title="Detalle de la nave"
        subtitle={starship?.name ?? 'Información primaria de la nave'}
      />

      {loading && <Spinner label="Cargando nave..." />}

      {!loading && error && (
        <StateMessage
          variant="error"
          title="No se pudo cargar la nave"
          description={error}
        />
      )}

      {!loading && !error && starship && <StarshipDetail starship={starship} />}

      {!loading && !error && !starship && (
        <div className="mt-4">
          <Button variant="outline" onClick={() => navigate('/')}>
            Ir a películas
          </Button>
        </div>
      )}
    </div>
  )
}
