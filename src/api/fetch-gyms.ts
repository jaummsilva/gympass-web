import nookies from 'nookies'

import { axiosFn } from '@/lib/axios'
import type { Gym } from '@/types/gym'

export interface FetchGymsResponse {
  gyms: Gym[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function fetchGyms({
  page,
  title,
}: {
  page?: number
  title?: string | null
}): Promise<FetchGymsResponse> {
  const token = nookies.get(null).token

  const response = await axiosFn.get<FetchGymsResponse>('/gym', {
    params: {
      page,
      title,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
