import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import './index.css'
import { Provider } from 'react-redux'
import Router from 'app/router'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import store from 'app/store'
import { setMyInfo } from 'pages/login/mySlice'
import { isAlive, storage } from 'api/storage'

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <Router />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
)

window.onbeforeunload = () => {
  const state = store.getState()
  let info = state.my.user
  if (info) {
    let u = JSON.stringify(state.my.user)
    storage.setUser(u)
  }
}

window.onload = () => {
  if (isAlive()) {
    let u = storage.getUser()
    if (u !== '') {
      let user = JSON.parse(u)
      store.dispatch(setMyInfo(user))
    }
  }
}
