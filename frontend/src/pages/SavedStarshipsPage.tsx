import { useState } from 'react'
import { PageHeader } from '@/components/molecules/PageHeader'
import { Spinner } from '@/components/atoms/Spinner'
import { StateMessage } from '@/components/molecules/StateMessage'
import { SavedStarshipsTable } from '@/components/organisms/SavedStarshipsTable'
import { useAsync } from '@/hooks/useAsync'
import {
  getSavedStarships,
  deleteSavedStarship,
} from '@/services/savedStarships.service'

// Naves guardadas en nuestra propia base de datos (lectura y borrado del CRUD).
export function SavedStarshipsPage() {
  const [reloadKey, setReloadKey] = useState(0)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const {
    data: starships,
    loading,
    error,
  } = useAsync(getSavedStarships, [reloadKey])

  const handleDelete = async (id: number) => {
    setDeletingId(id)
    try {
      await deleteSavedStarship(id)
      setReloadKey((k) => k + 1)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      <PageHeader
        title="Mis naves"
        subtitle="Naves que has guardado"
      />

      {loading && <Spinner label="Cargando naves guardadas..." />}

      {!loading && error && (
        <StateMessage
          variant="error"
          title="No se pudieron cargar tus naves"
          description={error}
        />
      )}

      {!loading && !error && starships && starships.length === 0 && (
        <StateMessage
          title="Todavía no has guardado ninguna nave"
          description="Entra a una nave y usa 'Editar datos' para guardarla."
        />
      )}

      {!loading && !error && starships && starships.length > 0 && (
        <SavedStarshipsTable
          starships={starships}
          onDelete={handleDelete}
          deletingId={deletingId}
        />
      )}
    </div>
  )
}
