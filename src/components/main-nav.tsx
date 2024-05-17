import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { routes } from '@/config/routes'
import { cn } from '@/lib/utils'

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      {routes.map(({ href, label, key }) => (
        <Link
          key={key}
          href={href}
          data-active={pathname.includes(key)}
          className="text-sm font-medium transition-colors hover:text-primary data-[active=false]:text-muted-foreground"
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
