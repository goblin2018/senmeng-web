import { Events, REFRESH_TOKEN, TOKEN } from './constants'

const getToken = (): string => {
  return sessionStorage.getItem(TOKEN) ? sessionStorage.getItem(TOKEN)! : ''
}

const getRefreshToken = (): string => {
  return sessionStorage.getItem(REFRESH_TOKEN) ? sessionStorage.getItem(REFRESH_TOKEN)! : ''
}

const setToken = (str: string) => {
  return sessionStorage.setItem(TOKEN, str)
}
const setRefreshToken = (str: string) => {
  return sessionStorage.setItem(REFRESH_TOKEN, str)
}

const hasError = (): boolean => sessionStorage.getItem(Events.TokenError) !== null

export const storage = {
  hasError,
  getToken,
  getRefreshToken,
  setToken,
  setRefreshToken
}
