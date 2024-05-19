'use client'

import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function GymTableFilters() {
  return (
    <form className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>
      <Input id="id" placeholder="ID da academia" className="h-8 w-auto" />
      <Input
        id="title"
        placeholder="Nome da academia"
        className="h-8 w-[320px]"
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 size-4" />
        Filtrar
      </Button>
      <Button type="button" variant="outline" size="xs">
        <Search className="mr-2 size-4" />
        Remover Filtros
      </Button>
    </form>
  )
}
