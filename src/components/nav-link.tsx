'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'

interface NavLinkProps extends PropsWithChildren, LinkProps {}

export function NavLink(props: NavLinkProps) {
  const pathname = usePathname()

  return (
    <Link
      {...props}
      data-current={pathname === props.href}
      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[current=true]:text-foreground"
    />
  )
}
