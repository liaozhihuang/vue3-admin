import { post } from '@/utils/http'
import { AxiosPromise } from 'axios'

export const loginApi = (data:any) :AxiosPromise => {
  return post('/admin/auth/login', data)
}
