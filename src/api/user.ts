import http from './axios'

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
  actioin: 'update' | 'reset'
  old_passowrd?: string
  new_password?: string
}

const userUrl = '/api/user'

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
    data: user
  })
}

export const updatePassword = (req: UpdatePasswordReq) => {
  return http({
    method: 'PUT',
    url: `${userUrl}/passowrd`,
    data: req
  })
}

export const listUser = () => {
  return http({
    method: 'GET',
    url: userUrl
  }).then(res => res.data)
}
