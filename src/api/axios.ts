import axios from 'axios'
import { ErrCode, Events, REFRESH_TOKEN, TOKEN } from './constants'
import { storage } from './storage'

const http = axios.create({})

http.interceptors.request.use(req => {
  console.log('req', req)

  req.headers![TOKEN] = storage.getToken()

  if (storage.hasError()) {
    return Promise.reject()
  }

  return Promise.resolve(req)
})

http.interceptors.response.use(res => {
  let config = { ...res.config }
  console.log(res)

  switch (res.data.code) {
    case ErrCode.TokenTimeout:
      return handleTimeout(config)
    case ErrCode.TokenError:
      return handleTokenError()
    default:
      return Promise.resolve(res)
  }
})

// 超时处理
const handleTimeout = config => {
  return (
    http({
      method: 'POST',
      url: '/api/token/refresh',
      headers: {
        [REFRESH_TOKEN]: storage.getRefreshToken()
      }
    })
      .then(res => {
        console.log('refresh token')

        if (res.data.code == ErrCode.OK) {
          storage.setToken(res.headers[TOKEN])
          storage.setRefreshToken(res.headers[REFRESH_TOKEN])
        }
      })
      // 重新发起请求
      .then(() => http(config))
  )
}
// token 错误处理
const handleTokenError = () => {
  dispatchEvent(new Event(Events.TokenError))
  return Promise.reject()
}

export default http
