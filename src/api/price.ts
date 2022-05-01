import http from './axios'
import { ListOpt } from './listopt'

export interface Price {
  id: number
  material_id: number
  price: number
  date: Date
}

const priceUrl = '/api/price'
export const addPrice = (price: Price) => {
  // 处理价格问题
  price.price = price.price * 100
  return http({
    method: 'POST',
    url: priceUrl,
    data: price
  })
}

export const updatePrice = (price: Price) => {
  // 处理价格问题
  price.price = price.price * 100
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

type ListPriceOpt = ListOpt & {
  material_id?: number
}

export const listPrice = (opt: ListPriceOpt) => {
  return http({
    method: 'GET',
    url: priceUrl,
    params: opt
  }).then(res => res.data)
}
