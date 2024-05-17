import { axiosFn } from '@/lib/axios'

type AuthenticateProps = {
  email: string
  password: string
}

export async function authenticate({ email, password }: AuthenticateProps) {
  const response = await axiosFn.post<{
    token: string
  }>('/session', {
    email,
    password,
  })

  return response
}
