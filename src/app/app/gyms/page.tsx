'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { z } from 'zod'

import { fetchGyms, type FetchGymsResponse } from '@/api/fetch-gyms'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

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
  }
}

export default function Gym() {
  const searchParams = useSearchParams()

  const id = searchParams.get('id')
  const title = searchParams.get('title')

  const page = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: result, isLoading: isLoadingGyms } =
    useQuery<FetchGymsResponse>({
      queryKey: ['gyms', page, id, title],
      queryFn: async () => {
        const response = await fetchGyms({ id, title, page })
        return response
      },
      staleTime: 1000 * 60 * 5,
    })

  // function handlePaginate(page: number) {
  //   const { query } = router
  //   const newQuery = { ...query, page: (page + 1).toString() }

  //   router.push({
  //     pathname: router.pathname,
  //     query: newQuery,
  //   })
  // }

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
        <GymTableFilters />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[170px]">Identificador</TableHead>
                <TableHead className="w-[180px]">Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="w-[140px]">Telefone</TableHead>
                <TableHead className="w-[140px]">Latitude</TableHead>
                <TableHead className="w-[140px]">Longitude</TableHead>
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
        {/* Uncomment and update Pagination component as needed */}
        {/* <Pagination
          onChangePage={handlePaginate}
          pageIndex={result?.meta.pageIndex ?? 0}
          perPage={result?.meta.perPage ?? 10}
          totalCount={result?.meta.totalCount ?? 0}
        /> */}
      </div>
    </div>
  )
}
