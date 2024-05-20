import nookies from 'nookies'

import { axiosFn } from '@/lib/axios'

interface Gym {
  id: string
  title: string
  description?: string | null
  phone: string
  latitude: number
  longitude: number
}

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
  id,
  title,
}: {
  page?: number
  id?: string | null
  title?: string | null
}): Promise<FetchGymsResponse> {
  const token = nookies.get(null).token

  const response = await axiosFn.get<FetchGymsResponse>('/gym', {
    params: {
      page,
      id,
      title,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}
