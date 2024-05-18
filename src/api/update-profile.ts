import nookies from 'nookies'

import { axiosFn } from '@/lib/axios'

type UpdateProfileProps = {
  email: string
  password: string
  name: string
}

export async function updateProfile({
  name,
  email,
  password,
}: UpdateProfileProps) {
  const token = nookies.get(null).token

  const response = await axiosFn.put(
    '/user',
    {
      name,
      email,
      password,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response
}
