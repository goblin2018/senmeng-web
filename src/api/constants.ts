export const ActionTypes = {
  SaveUser: 'SaveUser'
}
export const TOKEN = 'goblintoken'
export const REFRESH_TOKEN = 'goblinrefreshtoken'
export const Events = {
  TokenError: 'TokenError'
}

export const ErrCode = {
  OK: 200,
  UserNotExists: 1000,
  InvalidPassword: 1010,
  TokenTimeout: 1051,
  TokenError: 1050,
  DBError: 2000
}

export const UserLevel = {
  Normal: 1,
  Admin: 99
}

export const UserStatus = {
  Normal: 1,
  Denied: 2
}

export const DefaultPassword = 'sengmeng66'
