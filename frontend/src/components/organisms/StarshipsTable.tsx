import { useNavigate } from 'react-router-dom'
import type { Starship } from '@/types/swapi'
import { Button } from '@/components/atoms/Button'
import { NotchFooter } from '@/components/atoms/NotchFooter'

interface Props {
  starships: Starship[]
}

// Listado de naves. Al hacer clic sobre toda la fila (o en "Ver más") se abre
// el detalle (Pantalla 3).
export function StarshipsTable({ starships }: Props) {
  const navigate = useNavigate()

  const goToDetail = (ship: Starship) => navigate(`/naves/${ship.id}`)

  return (
    <div className="animate-fade-in overflow-hidden rounded-t-lg">
      {/* Tabla en desktop */}
      <table className="hidden w-full text-left text-sm md:table">
        <thead className="bg-ink-800 text-ink-300">
          <tr>
            <th className="px-4 py-3 font-semibold">Nave</th>
            <th className="px-4 py-3 font-semibold">Modelo</th>
            <th className="px-4 py-3 font-semibold">Clase</th>
            <th className="px-4 py-3 text-right font-semibold">Detalle</th>
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
              <td className="px-4 py-3 text-right">
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    goToDetail(ship)
                  }}
                >
                  Ver más
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        {/* Pie de la tabla con la muesca */}
        <tfoot>
          <tr>
            <td colSpan={4} className="p-0">
              <NotchFooter />
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Tarjetas en móvil */}
      <ul className="divide-y divide-ink-700 md:hidden">
        {starships.map((ship) => (
          <li
            key={ship.id}
            onClick={() => goToDetail(ship)}
            className="cursor-pointer bg-ink-950 p-4 transition-colors hover:bg-ink-800/60"
          >
            <p className="text-base font-semibold text-white">{ship.name}</p>
            <p className="mt-1 text-sm text-ink-300">{ship.model}</p>
            <p className="mt-0.5 text-xs text-ink-400">{ship.starshipClass}</p>
            <Button
              className="mt-3 w-full"
              onClick={(e) => {
                e.stopPropagation()
                goToDetail(ship)
              }}
            >
              Ver más
            </Button>
          </li>
        ))}
      </ul>

      {/* Pie con la muesca para el listado móvil */}
      <NotchFooter className="md:hidden" />
    </div>
  )
}
