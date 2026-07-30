import { useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { PageHeader } from '@/components/molecules/PageHeader'
import { BackLink } from '@/components/atoms/BackLink'
import { Spinner } from '@/components/atoms/Spinner'
import { StateMessage } from '@/components/molecules/StateMessage'
import { StarshipForm } from '@/components/organisms/StarshipForm'
import { Button } from '@/components/atoms/Button'
import { useAsync } from '@/hooks/useAsync'
import { getStarship } from '@/services/starships.service'
import { createSavedStarship } from '@/services/savedStarships.service'
import type { Starship } from '@/types/swapi'
import type { SavedStarship } from '@/types/savedStarship'
import type { StarshipFormValues } from '@/schemas/starshipForm.schema'

// Pantalla 3.1: formulario con datos de la nave, validaciones y envío al backend.
export function StarshipFormPage() {
  const { starshipId } = useParams<{ starshipId: string }>()
  const location = useLocation()
  const stateShip = (location.state as { starship?: Starship } | null)?.starship

  // Si venimos del detalle, la nave llega por state; si no (deep link), se consulta.
  const {
    data: starship,
    loading,
    error,
  } = useAsync<Starship>(
    () => (stateShip ? Promise.resolve(stateShip) : getStarship(starshipId!)),
    [starshipId],
  )

  const [submitting, setSubmitting] = useState(false)
  const [saved, setSaved] = useState<SavedStarship | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleSubmit = async (values: StarshipFormValues) => {
    setSubmitting(true)
    setSubmitError(null)
    try {
      const created = await createSavedStarship(values)
      setSaved(created)
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'No se pudo guardar la nave',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <BackLink label="Volver" />
      <PageHeader
        title="Editar datos de la nave"
        subtitle={starship?.name ?? 'Formulario'}
      />

      {loading && <Spinner label="Cargando nave..." />}

      {!loading && error && (
        <StateMessage
          variant="error"
          title="No se pudo cargar la nave"
          description={error}
        />
      )}

      {!loading && !error && starship && !saved && (
        <div className="mx-auto w-full max-w-md space-y-4">
          {submitError && (
            <StateMessage
              variant="error"
              title="No se pudo guardar"
              description={submitError}
            />
          )}
          <StarshipForm
            defaultValues={{
              name: starship.name,
              model: starship.model,
              maxAtmospheringSpeed: starship.maxAtmospheringSpeed,
            }}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        </div>
      )}

      {saved && (
        <div className="mx-auto w-full max-w-md space-y-4 text-center">
          <StateMessage
            title="¡Nave guardada!"
            description={`Los datos de "${saved.name}" se guardaron correctamente.`}
          />
          <Button variant="outline" onClick={() => setSaved(null)}>
            Editar de nuevo
          </Button>
        </div>
      )}
    </div>
  )
}
