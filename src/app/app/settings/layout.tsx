import type { Metadata } from 'next'

import { Separator } from '@/components/ui/separator'

import { SidebarNav } from './_components/sidebar-nav'

const sidebarNavItems = [
  {
    title: 'Perfil',
    href: '/app/settings/profile',
  },
  {
    title: 'Aparência',
    href: '/app/settings/appearance',
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: 'Configurações',
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="space-y-6 p-10 pb-16  ">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Configurações</h2>
        <p className="text-muted-foreground">
          Organize suas configurações de conta e aparencia do sistema.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="">{children}</div>
      </div>
    </div>
  )
}
