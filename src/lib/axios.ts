import axios from 'axios'

export const axiosFn = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
})
