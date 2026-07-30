import { PageHeader } from '@/components/molecules/PageHeader'

// Pantalla 2: naves que aparecen en la película seleccionada.
export function FilmStarshipsPage() {
  return (
    <div>
      <PageHeader title="Naves de la película" subtitle="Pantalla 2" />
      <p className="text-ink-400/70">Próximamente: naves de la película.</p>
    </div>
  )
}
