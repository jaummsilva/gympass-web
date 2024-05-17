import { axiosFn } from '@/lib/axios'

export async function signOut() {
  await axiosFn.post('/sign-out')
}
