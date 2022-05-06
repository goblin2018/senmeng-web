import http from './axios'
import { ListOpt } from './listopt'

export interface Operation {
  user_id: number
  id: number
  name: string
  bussiness: string
  action: number
  data: Object
  old_data: Object
  ip: string
  created_at: Date
}

export const listOperation = (opt: ListOpt) => {
  return http({
    method: 'GET',
    url: '/api/operation',
    params: opt
  }).then(res => res.data)
}
