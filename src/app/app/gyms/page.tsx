'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'

import { fetchGyms, type FetchGymsResponse } from '@/api/fetch-gyms'
import { Pagination } from '@/components/pagination'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { GymCreateSheet } from './_components/gym-create-sheet'
import { GymTableFilters } from './_components/gym-table-filters'
import { GymTableRow } from './_components/gym-table-row'
import { GymTableSkeleton } from './_components/gym-table-skeleton'

export interface GymTableRowProps {
  gym: {
    id: string
    title: string
    description?: string | null
    phone: string
    latitude: number
    longitude: number
    totalCheckIns: number
  }
}

export default function Gym() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const title = searchParams.get('title')

  const page = z.coerce.number().parse(searchParams.get('page') ?? '1')

  const { data: result, isLoading: isLoadingGyms } =
    useQuery<FetchGymsResponse>({
      queryKey: ['gyms', page, title],
      queryFn: async () => {
        const response = await fetchGyms({ title, page })
        return response
      },
    })

  function handlePaginate(pageIndex: number) {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('page', pageIndex.toString())

    // Atualiza a URL com os novos parâmetros de pesquisa
    router.replace(`?${newSearchParams.toString()}`)
  }

  return (
    <div className="space-y-6 p-10 pb-16">
      <div>
        <h3 className="text-2xl font-bold tracking-tight">Academias</h3>
        <p className="text-sm text-muted-foreground">
          Visualize as informações das academias do sistema.
        </p>
      </div>
      <Separator />
      <div className="mt-4 space-y-2.5">
        <div className="flex flex-row justify-between">
          <GymTableFilters />
          <div>
            <GymCreateSheet />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="w-[180px]">Telefone</TableHead>
                <TableHead className="w-[180px]" style={{ textAlign: 'end' }}>
                  Latitude
                </TableHead>
                <TableHead className="w-[180px]" style={{ textAlign: 'end' }}>
                  Longitude
                </TableHead>
                <TableHead className="w-[180px]" style={{ textAlign: 'end' }}>
                  Total de Check-ins
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody style={{ height: '100%' }}>
              {isLoadingGyms ? (
                <GymTableSkeleton />
              ) : (
                result &&
                result.gyms.map((gym) => <GymTableRow key={gym.id} gym={gym} />)
              )}
            </TableBody>
          </Table>
        </div>
        <Pagination
          onChangePage={handlePaginate}
          pageIndex={
            result && result.meta.pageIndex !== undefined
              ? result.meta.pageIndex
              : 1
          }
          perPage={
            result && result.meta.perPage !== undefined
              ? result.meta.perPage
              : 10
          }
          totalCount={
            result && result.meta.totalCount !== undefined
              ? result.meta.totalCount
              : 0
          }
        />
      </div>
    </div>
  )
}
