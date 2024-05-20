'use client'

import { Badge } from '@/components/ui/badge'
import { TableCell, TableRow } from '@/components/ui/table'

import type { GymTableRowProps } from '../page'

export function GymTableRow({ gym }: GymTableRowProps) {
  return (
    <TableRow>
      <TableCell className="">{gym.title}</TableCell>
      <TableCell className="">{gym.description ?? ''}</TableCell>
      <TableCell>{gym.phone}</TableCell>
      <TableCell className="font-medium" style={{ textAlign: 'end' }}>
        {gym.latitude}
      </TableCell>
      <TableCell className="font-medium" style={{ textAlign: 'end' }}>
        {gym.longitude}
      </TableCell>
      <TableCell className="font-medium" style={{ textAlign: 'end' }}>
        <Badge variant={'emerald'} className="text-sm font-bold">
          {gym.totalCheckIns}
        </Badge>
      </TableCell>
    </TableRow>
  )
}
