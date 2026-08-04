import { useNavigate } from 'react-router-dom'
import type { Film } from '@/types/swapi'
import { Button } from '@/components/atoms/Button'
import { NotchFooter } from '@/components/atoms/NotchFooter'

interface Props {
  films: Film[]
}

function formatDate(iso: string): string {
  const date = new Date(iso)
  return Number.isNaN(date.getTime())
    ? iso
    : date.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })
}

// Listado de películas. Cada fila tiene un botón para ver las naves de la película.
export function FilmsTable({ films }: Props) {
  const navigate = useNavigate()

  const goToStarships = (film: Film) => {
    navigate(`/peliculas/${film.id}/naves`, {
      state: { filmTitle: film.title },
    })
  }

  return (
    <div className="animate-fade-in overflow-hidden rounded-t-lg">
      {/* Tabla en desktop */}
      <table className="hidden w-full text-left text-sm md:table">
        <thead className="bg-ink-800 text-ink-300">
          <tr>
            <th className="px-4 py-3 font-semibold">Película</th>
            <th className="px-4 py-3 font-semibold">Director</th>
            <th className="px-4 py-3 font-semibold">Estreno</th>
            <th className="px-4 py-3 text-right font-semibold">Consultar</th>
          </tr>
        </thead>
        <tbody>
          {films.map((film) => (
            <tr
              key={film.id}
              className="border-t border-ink-700 bg-ink-950 hover:bg-ink-800/60"
            >
              <td className="px-4 py-3 font-medium text-white">
                <span className="text-ink-400">Ep. {film.episode} · </span>
                {film.title}
              </td>
              <td className="px-4 py-3 text-ink-300">{film.director}</td>
              <td className="px-4 py-3 text-ink-300">
                {formatDate(film.releaseDate)}
              </td>
              <td className="px-4 py-3 text-right">
                <Button onClick={() => goToStarships(film)}>Ver naves</Button>
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
        {films.map((film) => (
          <li key={film.id} className="bg-ink-950 p-4">
            <p className="text-xs text-ink-400">Episodio {film.episode}</p>
            <p className="mt-0.5 text-base font-semibold text-white">
              {film.title}
            </p>
            <p className="mt-1 text-sm text-ink-300">
              {film.director} · {formatDate(film.releaseDate)}
            </p>
            <Button
              className="mt-3 w-full"
              onClick={() => goToStarships(film)}
            >
              Ver naves
            </Button>
          </li>
        ))}
      </ul>

      {/* Pie con la muesca para el listado móvil */}
      <NotchFooter className="md:hidden" />
    </div>
  )
}
