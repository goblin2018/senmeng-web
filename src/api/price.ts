import http from './axios'
import { ListOpt } from './listopt'
import { Moq } from './moq'
import { User } from './user'

export const PriceStatus = {
  NotAudit: 1,
  Ok: 2
}

export interface Price {
  id: number
  moq_id: number
  price: number
  date: Date
  status: number
  moq?: Moq
  editor?: User
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
    data: { id: price.id }
  })
}

type ListPriceOpt = ListOpt & {
  materialId?: number
  status?: number
  moqId?: number
}

export const listPrice = (opt: ListPriceOpt) => {
  return http({
    method: 'GET',
    url: priceUrl,
    params: opt
  }).then(res => res.data)
}
export const auditPrice = (price: Price) => {
  return http({
    method: 'POST',
    url: priceUrl + '/audit',
    data: { id: price.id }
  })
}
