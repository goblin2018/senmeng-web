import http from './axios'
import { ListOpt } from './listopt'

export interface Price {
  id: number
  material_id: number
  price: number
  date: string
}

const priceUrl = '/api/price'
export const addPrice = (price: Price) => {
  return http({
    method: 'POST',
    url: priceUrl,
    data: price
  })
}

export const updatePrice = (price: Price) => {
  return http({
    method: 'PUT',
    url: priceUrl,
    data: price
  })
}

export const delPrice = (price: Price) => {
  return http({
    method: 'DELETE',
    url: priceUrl,
    data: price
  })
}

export const listPrice = (opt: ListOpt) => {
  return http({
    method: 'GET',
    url: priceUrl,
    params: opt
  }).then(res => res.data)
}
