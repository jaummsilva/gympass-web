'use client'

import { useQuery } from '@tanstack/react-query'
import { PropsWithChildren, Suspense } from 'react'

import { getProfile } from '@/api/get-profile'
import { MainNav } from '@/components/main-nav'
import { SideMenu } from '@/components/side-menu'
import TeamSwitcher from '@/components/team-switcher'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserNav } from '@/components/user-nav'

export default function Layout({ children }: PropsWithChildren) {
  const { data: profile, isFetching: isFechingProfileData } = useQuery({
    queryKey: ['get-profile'],
    queryFn: async () => {
      const response = await getProfile()

      return response.data
    },
    staleTime: 1000 * 60 * 5,
  })

  return (
    <>
      <div className="border-b px-10">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-2">
            <TeamSwitcher
              user={isFechingProfileData ? undefined : profile?.user}
            />
            <div className="block md:hidden">
              <ThemeToggle />
            </div>
          </div>
          <div className="hidden md:block">
            <MainNav className="mx-6" />
          </div>
          <div className="ml-auto flex items-center space-x-4 md:hidden">
            <UserNav user={isFechingProfileData ? undefined : profile?.user} />
            <SideMenu />
          </div>
          <div className="ml-auto hidden items-center space-x-4 md:flex">
            <ThemeToggle />
            <UserNav user={isFechingProfileData ? undefined : profile?.user} />
          </div>
        </div>
      </div>
      <Suspense>{children}</Suspense>
    </>
  )
}
