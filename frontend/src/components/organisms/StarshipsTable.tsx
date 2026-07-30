import { useNavigate } from 'react-router-dom'
import type { Starship } from '@/types/swapi'

interface Props {
  starships: Starship[]
}

// Listado de naves. Al hacer clic sobre toda la fila se abre el detalle (Pantalla 3).
export function StarshipsTable({ starships }: Props) {
  const navigate = useNavigate()

  const goToDetail = (ship: Starship) => navigate(`/naves/${ship.id}`)

  return (
    <div className="overflow-hidden rounded-lg border border-ink-700">
      {/* Tabla en desktop */}
      <table className="hidden w-full text-left text-sm md:table">
        <thead className="bg-ink-800 text-ink-300">
          <tr>
            <th className="px-4 py-3 font-semibold">Nave</th>
            <th className="px-4 py-3 font-semibold">Modelo</th>
            <th className="px-4 py-3 font-semibold">Clase</th>
          </tr>
        </thead>
        <tbody>
          {starships.map((ship) => (
            <tr
              key={ship.id}
              onClick={() => goToDetail(ship)}
              className="cursor-pointer border-t border-ink-700 bg-ink-950 transition-colors hover:bg-ink-800/60"
            >
              <td className="px-4 py-3 font-medium text-white">{ship.name}</td>
              <td className="px-4 py-3 text-ink-300">{ship.model}</td>
              <td className="px-4 py-3 text-ink-300">{ship.starshipClass}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tarjetas en móvil */}
      <ul className="divide-y divide-ink-700 md:hidden">
        {starships.map((ship) => (
          <li key={ship.id}>
            <button
              type="button"
              onClick={() => goToDetail(ship)}
              className="w-full bg-ink-950 p-4 text-left transition-colors hover:bg-ink-800/60"
            >
              <p className="text-base font-semibold text-white">{ship.name}</p>
              <p className="mt-1 text-sm text-ink-300">{ship.model}</p>
              <p className="mt-0.5 text-xs text-ink-400">{ship.starshipClass}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
