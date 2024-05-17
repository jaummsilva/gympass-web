'use client'

import { QueryClientProvider as Root } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

import { queryClient } from '@/lib/query-client'

export function QueryClientProvider({ children }: PropsWithChildren) {
  return <Root client={queryClient}>{children}</Root>
}
