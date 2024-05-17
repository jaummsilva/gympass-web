'use client'

import { useRouter } from 'next/navigation'
import nookies from 'nookies'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Skeleton } from './ui/skeleton'

type UserNavProps = {
  user:
    | {
        email: string
        name: string
      }
    | undefined
}
export function UserNav({ user }: UserNavProps) {
  const router = useRouter()

  function handleLogout() {
    nookies.destroy(null, 'token')

    return router.push('/sign-in')
  }

  function handleSettings() {
    return router.push('/settings')
  }

  let shortname: string = ''
  if (user) {
    console.log(user)
    const name = user.name
    const nameParts: string[] = name.split('.')

    nameParts.forEach((value, index) => {
      if (index === 0) {
        shortname += value.charAt(0).toUpperCase()
      } else {
        shortname += value.charAt(0).toUpperCase()
      }
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {user ? (
          <Button variant="ghost" className="relative size-8 rounded-full">
            <Avatar className="size-8">
              <AvatarImage src="/avatars/01.png" alt="@shadcn" />
              <AvatarFallback>{shortname}</AvatarFallback>
            </Avatar>
          </Button>
        ) : (
          <Skeleton className="size-8 rounded-full" />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            {user ? (
              <>
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </>
            ) : (
              <>
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
              </>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleSettings}>
            Configurações
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          Sair
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
