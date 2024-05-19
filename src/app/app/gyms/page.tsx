'use'

import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { GymTableFilters } from './_components/gym-table-filters'

export interface GymTableRowProps {
  gym: {
    Id: string
    title: string
    description?: string | null
    phone: string
    latitude: number
    longitude: number
  }
}

export default function Gym() {
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
            <TableBody style={{ height: '100%' }}>teste</TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
