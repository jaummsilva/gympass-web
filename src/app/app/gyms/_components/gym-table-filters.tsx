'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const gymFiltersSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
})

type GymFilterSchema = z.infer<typeof gymFiltersSchema>

export function GymTableFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const id = searchParams.get('id')
  const title = searchParams.get('title')

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<GymFilterSchema>({
    resolver: zodResolver(gymFiltersSchema),
    defaultValues: {
      title: title ?? '',
      id: id ?? '',
    },
  })

  function handleFilter(data: GymFilterSchema) {
    const params = new URLSearchParams(searchParams.toString())

    if (data.id) {
      params.set('id', data.id)
    } else {
      params.delete('id')
    }
    if (data.title) {
      params.set('title', data.title)
    } else {
      params.delete('title')
    }

    params.set('page', '1')
    router.push(`?${params.toString()}`)
  }

  function handleFilterReset() {
    reset({
      title: '',
      id: '',
    })
    router.push('?')
  }

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={handleSubmit(handleFilter)}
    >
      <span className="text-sm font-semibold">Filtros:</span>
      <Input
        id="id"
        placeholder="ID da academia"
        className="h-8 w-auto"
        {...register('id')}
      />
      <Input
        id="title"
        {...register('title')}
        placeholder="Nome da academia"
        className="h-8 w-[320px]"
      />

      <Button
        disabled={isSubmitting}
        type="submit"
        variant="secondary"
        size="xs"
      >
        <Search className="mr-2 size-4" />
        Filtrar
      </Button>
      <Button
        disabled={isSubmitting}
        type="button"
        variant="outline"
        size="xs"
        onClick={handleFilterReset}
      >
        <Search className="mr-2 size-4" />
        Remover Filtros
      </Button>
    </form>
  )
}
