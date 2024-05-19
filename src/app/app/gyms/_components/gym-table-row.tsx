'use client'

import { TableCell, TableRow } from '@/components/ui/table'

import type { GymTableRowProps } from '../page'

export function GymTableRow({ gym }: GymTableRowProps) {
  console.log(gym)
  return (
    <TableRow>
      <TableCell>TESTE</TableCell>
      <TableCell className="font-mono text-xs font-medium">TESTE</TableCell>
      <TableCell className="text-muted-foreground">TESTE</TableCell>
      <TableCell>TESTE</TableCell>
      <TableCell className="font-medium">TESTE</TableCell>
      <TableCell className="font-medium">TESTE</TableCell>
      <TableCell>TESTE</TableCell>
      <TableCell>TESTE</TableCell>
    </TableRow>
  )
}
