import { usePathname } from 'next/navigation'

import { NavLink } from './nav-link'

type RoutesProps = {
  setIsSheetOpen: (isOpen: boolean) => void
}

export function Routes({ setIsSheetOpen }: RoutesProps) {
  const pathname = usePathname()

  const routes = [
    {
      title: 'Academias',
      to: '/app/gyms',
    },
    {
      title: 'Check-ins',
      to: '/app/check-ins',
    },
    {
      title: 'Usuários',
      to: '/app/users',
    },
    {
      title: 'Configurações',
      to:
        pathname.includes('profile') || pathname.includes('appearance')
          ? '/app/settings/profile'
          : '',
    },
  ]

  return routes.map((route) => (
    <NavLink
      key={route.to}
      href={route.to}
      onClick={() => setIsSheetOpen(false)}
    >
      {route.title}
    </NavLink>
  ))
}
