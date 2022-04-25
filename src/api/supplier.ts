import http from './axios'
import { ListOpt } from './listopt'

export interface Supplier {
  id: number
  supplier_id: string
  name: string
}
const supUrl = '/api/supplier'
export const addSupplier = (sup: Supplier) => {
  return http({
    method: 'POST',
    url: supUrl,
    data: sup
  })
}

export const listSupplier = (opt: ListOpt) => {
  return http({
    method: 'GET',
    url: supUrl,
    params: opt
  }).then(res => res.data)
}

export const updateSupplier = (sup: Supplier) => {
  return http({
    method: 'PUT',
    url: supUrl,
    data: sup
  })
}

export const delSupplier = (sup: Supplier) => {
  return http({
    method: 'DELETE',
    url: supUrl,
    data: sup
  })
}
