import http from './axios'
import { Materials } from './materials'
import { Price } from './price'

export interface Moq {
  id?: number
  materialsId?: number
  materials?: Materials
  moq: number
  desc?: string
  priceList?: Price[]
}

const moqUrl = '/api/materials/moq'
export const addMoq = (m: Moq) => {
  return http({
    method: 'post',
    url: moqUrl,
    data: m
  })
}

export const updateMoq = (m: Moq) => {
  return http({
    method: 'put',
    url: moqUrl,
    data: m
  })
}

export const delMoq = (m: Moq) => {
  return http({
    method: 'delete',
    url: moqUrl,
    data: { id: m.id }
  })
}

export const listMoq = (materials_id: number) => {
  return http({
    method: 'get',
    url: moqUrl,
    params: { materials_id: materials_id }
  })
}
