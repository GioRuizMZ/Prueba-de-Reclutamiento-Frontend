import type { SavedStarship } from '@/types/savedStarship'
import { Button } from '@/components/atoms/Button'

interface Props {
  starships: SavedStarship[]
  onDelete: (id: number) => void
  deletingId?: number | null
}

// Tabla de naves guardadas.
export function SavedStarshipsTable({ starships, onDelete, deletingId }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border border-ink-700">
      {/* Tabla en desktop */}
      <table className="hidden w-full text-left text-sm md:table">
        <thead className="bg-ink-800 text-ink-300">
          <tr>
            <th className="px-4 py-3 font-semibold">Nave</th>
            <th className="px-4 py-3 font-semibold">Modelo</th>
            <th className="px-4 py-3 font-semibold">Velocidad</th>
            <th className="px-4 py-3 text-right font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {starships.map((ship) => (
            <tr key={ship.id} className="border-t border-ink-700 bg-ink-950">
              <td className="px-4 py-3 font-medium text-white">{ship.name}</td>
              <td className="px-4 py-3 text-ink-300">{ship.model}</td>
              <td className="px-4 py-3 text-ink-300">
                {ship.maxAtmospheringSpeed}
              </td>
              <td className="px-4 py-3 text-right">
                <Button
                  variant="outline"
                  disabled={deletingId === ship.id}
                  onClick={() => onDelete(ship.id)}
                >
                  {deletingId === ship.id ? 'Eliminando...' : 'Eliminar'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tarjetas en móvil */}
      <ul className="divide-y divide-ink-700 md:hidden">
        {starships.map((ship) => (
          <li key={ship.id} className="bg-ink-950 p-4">
            <p className="text-base font-semibold text-white">{ship.name}</p>
            <p className="mt-1 text-sm text-ink-300">{ship.model}</p>
            <p className="mt-0.5 text-xs text-ink-400">
              Velocidad: {ship.maxAtmospheringSpeed}
            </p>
            <Button
              variant="outline"
              className="mt-3 w-full"
              disabled={deletingId === ship.id}
              onClick={() => onDelete(ship.id)}
            >
              {deletingId === ship.id ? 'Eliminando...' : 'Eliminar'}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
