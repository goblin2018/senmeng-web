import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store'
import Router from 'router'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <Router />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
)
