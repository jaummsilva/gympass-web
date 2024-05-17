import nookies from 'nookies'

import { axiosFn } from '@/lib/axios'

export async function getProfile() {
  const token = nookies.get(null).token

  const response = await axiosFn.get<{
    user: {
      name: string
      email: string
    }
  }>('/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response
}
