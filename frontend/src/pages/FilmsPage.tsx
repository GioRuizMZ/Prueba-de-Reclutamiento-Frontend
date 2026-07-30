import { PageHeader } from '@/components/molecules/PageHeader'

// Pantalla 1: listado de películas de Star Wars (implementación en rama siguiente).
export function FilmsPage() {
  return (
    <div>
      <PageHeader
        title="Películas"
        subtitle="Listado de películas de Star Wars"
      />
      <p className="text-ink-400/70">Próximamente: listado de películas.</p>
    </div>
  )
}
