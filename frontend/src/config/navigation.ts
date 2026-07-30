// Enlaces de navegación usados tanto en el navbar (desktop) como en el sidebar (móvil).
export interface NavItem {
  label: string
  to: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Películas', to: '/' },
  { label: 'Mis naves', to: '/naves-guardadas' },
]

export const PROJECT_NAME = 'Prueba frontend'
export const LOGO_URL =
  'https://static.vecteezy.com/system/resources/previews/027/127/457/non_2x/star-wars-logo-star-wars-icon-transparent-free-png.png'
