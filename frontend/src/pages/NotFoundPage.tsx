import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/molecules/PageHeader'

export function NotFoundPage() {
  return (
    <div>
      <PageHeader title="404" subtitle="Esta no es la página que buscas" />
      <Link to="/" className="text-white hover:text-white">
        Volver al inicio
      </Link>
    </div>
  )
}
