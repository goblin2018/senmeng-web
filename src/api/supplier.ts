import http from './axios'
import { ListOpt } from './listopt'

type ListSupplierOpt = ListOpt & {
  code?: string
  name?: string
}

export interface Supplier {
  id: number
  code: string
  name: string
}

export const initSupplier: Supplier = {
  id: 0,
  code: '',
  name: ''
}

const supUrl = '/api/supplier'
export const addSupplier = (sup: Supplier) => {
  return http({
    method: 'POST',
    url: supUrl,
    data: sup
  })
}

export const listSupplier = (opt: ListSupplierOpt) => {
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
