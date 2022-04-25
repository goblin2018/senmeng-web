import http from './axios'
import { ListOpt } from './listopt'

export interface Operation {
  user_id: number
  id: number
  operation: number
  data: string
}

export const listOperation = (opt: ListOpt) => {
  return http({
    method: 'GET',
    url: '/api/operation',
    params: opt
  }).then(res => res.data)
}
