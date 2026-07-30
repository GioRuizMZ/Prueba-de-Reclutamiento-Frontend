import { useNavigate } from 'react-router-dom'
import type { Starship } from '@/types/swapi'
import { Button } from '@/components/atoms/Button'
import { DetailList } from '@/components/molecules/DetailList'

interface Props {
  starship: Starship
}

// SWAPI usa estos textos cuando no hay dato; se tratan como "sin valor".
const EMPTY_VALUES = ['', 'unknown', 'n/a', 'none', 'none known', 'not applicable']

function hasValue(value: string): boolean {
  return !EMPTY_VALUES.includes(value.trim().toLowerCase())
}

// Detalle primario de una nave, con acceso al formulario (Pantalla 3.1).
export function StarshipDetail({ starship }: Props) {
  const navigate = useNavigate()

  // Se ocultan los campos sin información (vacíos o "unknown").
  const items = [
    { label: 'Modelo', value: starship.model },
    { label: 'Clase', value: starship.starshipClass },
    { label: 'Fabricante', value: starship.manufacturer },
    { label: 'Velocidad atmosférica', value: starship.maxAtmospheringSpeed },
    { label: 'Tripulación', value: starship.crew },
    { label: 'Pasajeros', value: starship.passengers },
    { label: 'Costo (créditos)', value: starship.costInCredits },
    { label: 'Longitud', value: starship.length },
    { label: 'Capacidad de carga', value: starship.cargoCapacity },
    { label: 'Hiperimpulsor', value: starship.hyperdriveRating },
    { label: 'Consumibles', value: starship.consumables },
  ].filter((item) => hasValue(item.value))

  const goToForm = () =>
    navigate(`/naves/${starship.id}/formulario`, { state: { starship } })

  return (
    <div className="rounded-lg border border-ink-700 bg-ink-800 p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            {starship.name}
          </h2>
          <p className="mt-1 text-sm text-ink-400">{starship.model}</p>
        </div>
        <Button onClick={goToForm}>Editar datos</Button>
      </div>

      <DetailList items={items} />
    </div>
  )
}
