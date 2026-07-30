import { PageHeader } from '@/components/molecules/PageHeader'

// Naves guardadas en nuestra propia API (CRUD).
export function SavedStarshipsPage() {
  return (
    <div>
      <PageHeader
        title="Mis naves"
        subtitle="Naves guardadas en la base de datos"
      />
      <p className="text-ink-400/70">Próximamente: listado desde nuestra API.</p>
    </div>
  )
}
