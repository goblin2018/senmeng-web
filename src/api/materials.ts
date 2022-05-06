import http from './axios'
import { ListOpt } from './listopt'
import { Price } from './price'
import { Supplier } from './supplier'

type ListMaterialsOpt = ListOpt & {
  name?: string
  supplier_id?: number
  code?: string
  with_price?: boolean
}

export interface Materials {
  id: number
  name: string
  code: string
  supplier?: Supplier
  desc: string
  unit?: string
  price_list?: Price[]
}

const matUrl = '/api/materials'

export const addMaterials = (mat: Materials) => {
  return http({
    method: 'POST',
    url: matUrl,
    data: mat
  })
}

export const updateMaterials = (mat: Materials) => {
  return http({
    method: 'PUT',
    url: matUrl,
    data: mat
  })
}

export const delMaterials = (mat: Materials) => {
  return http({
    method: 'DELETE',
    url: matUrl,
    data: { id: mat.id }
  })
}

export const listMaterials = (opt: ListMaterialsOpt) => {
  return http({
    method: 'GET',
    url: matUrl,
    params: opt
  }).then(res => res.data)
}
