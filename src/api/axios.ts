import axios from 'axios'
import { ErrCode, Events, REFRESH_TOKEN, TOKEN } from './constants'
import { storage } from './storage'

const http = axios.create({
  headers: {
    'x-c-token': storage.getToken()
  }
})

http.interceptors.request.use(req => {
  // console.log('req', req)

  if (storage.hasError()) {
    return Promise.reject()
  }

  return Promise.resolve(req)
})

http.interceptors.response.use(res => {
  console.log('res', res)

  let config = { ...res.config }

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
      url: '/token/refresh',
      headers: {
        'x-c-refresh-token': storage.getRefreshToken()
      }
    })
      .then(res => {
        if (res.data.code == ErrCode.OK) {
          storage.setToken(res.headers[TOKEN])
          storage.setRefreshToken(res.headers[REFRESH_TOKEN])
          http.defaults.headers.common[TOKEN] = storage.getToken()
          config.headers[TOKEN] = storage.getToken()
        }
      })
      // 重新发起请求
      .then(() => http(config))
  )

  // const backoff = new Promise(resolve => {
  //   setTimeout(resolve, 1000)
  // })

  // return backoff.then(() => http(config))
}
// token 错误处理
const handleTokenError = () => {
  dispatchEvent(new Event(Events.TokenError))
  return Promise.reject()
}

export default http
