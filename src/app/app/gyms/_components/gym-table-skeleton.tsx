import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function GymTableSkeleton() {
  return Array.from({ length: 20 }).map((_, i) => {
    return (
      <TableRow key={i}>
        <TableCell>
          <Skeleton className="h-4 w-[200px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[180px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[180px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[180px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-[140px]" />
        </TableCell>
      </TableRow>
    )
  })
}
