import http from './axios'
import { ListOpt } from './listopt'

export interface Materials {
  id: number
  name: string
  code: string
  supplier_id: number
  desc: string
  unit?: string
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
    data: mat
  })
}

export const listMaterials = (opt: ListOpt) => {
  return http({
    method: 'GET',
    url: matUrl,
    params: opt
  }).then(res => res.data)
}
