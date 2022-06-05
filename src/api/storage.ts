import { Events, REFRESH_TOKEN, TOKEN } from './constants'

const getToken = (): string => {
  return localStorage.getItem(TOKEN) ? localStorage.getItem(TOKEN)! : ''
}

const getRefreshToken = (): string => {
  return localStorage.getItem(REFRESH_TOKEN) ? localStorage.getItem(REFRESH_TOKEN)! : ''
}

const setToken = (str: string) => {
  localStorage.setItem(TOKEN, str)
  localStorage.setItem('alive', (Date.now() + 1000 * 60 * 60 * 59).toString())
}
const setRefreshToken = (str: string) => {
  localStorage.setItem(REFRESH_TOKEN, str)
}

export const isAlive = (): boolean => {
  let alive = localStorage.getItem('alive')
  if (alive !== null) {
    let d = parseInt(alive)
    if (d > Date.now()) {
      return true
    } else {
      localStorage.removeItem('alive')
      localStorage.removeItem(TOKEN)
      localStorage.removeItem(REFRESH_TOKEN)
    }
  }
  return false
}

const getUser = (): string => {
  return localStorage.getItem('myInfo') ? localStorage.getItem('myInfo')! : ''
}

const setUser = (str: string) => {
  localStorage.setItem('myInfo', str)
}

const hasError = (): boolean => localStorage.getItem(Events.TokenError) !== null

const clear = () => {
  localStorage.clear()
}

export const storage = {
  hasError,
  getToken,
  getRefreshToken,
  setToken,
  setRefreshToken,
  setUser,
  getUser,
  clear
}
