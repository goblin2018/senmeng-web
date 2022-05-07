import http from './axios'
import { TOKEN } from './constants'
import { ListOpt } from './listopt'
import { storage } from './storage'

export interface User {
  id: number
  username: string
  phone?: string
  name?: string
  password?: string
  status: number
  level: number
}

export interface UpdatePasswordReq {
  id: number
  action: 'update' | 'reset'
  old_passowrd?: string
  new_password?: string
  confirm_password?: string
}

const userUrl = '/api/user'

export const hasLogin = (): boolean => {
  // console.log('haslogin', !!sessionStorage.getItem(TOKEN), storage.getToken())
  return !!sessionStorage.getItem(TOKEN)
}

export const login = (user: User) => {
  return http({
    method: 'POST',
    url: '/api/login',
    data: user
  })
}

export const addUser = (user: User) => {
  return http({
    method: 'POST',
    url: userUrl,
    data: user
  })
}

export const updateUser = (user: User) => {
  return http({
    method: 'PUT',
    url: userUrl,
    data: user
  })
}

export const delUser = (user: User) => {
  return http({
    method: 'DELETE',
    url: userUrl,
    data: {
      id: user.id
    }
  })
}

export const updatePassword = (req: UpdatePasswordReq) => {
  return http({
    method: 'PUT',
    url: `${userUrl}/password`,
    data: req
  })
}

export const listUser = (opt: ListOpt) => {
  return http({
    method: 'GET',
    url: userUrl,
    params: opt
  }).then(res => {
    console.log('list user res', res)

    return res.data
  })
}
