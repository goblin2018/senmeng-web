import React, { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import bg from './bg.png'
import API from 'api'
import { User } from 'api/user'
import { isPhone } from 'utils/string'
import { ErrCode, REFRESH_TOKEN, TOKEN } from 'api/constants'
import { useAppDispatch } from 'app/hooks'
import { setMyInfo } from './mySlice'
import { storage } from 'api/storage'
const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const [loginForm] = Form.useForm()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const login = () =>
    loginForm.validateFields().then(() => {
      let u: User = loginForm.getFieldsValue() as User
      if (isPhone(u.username)) {
        u.phone = u.username
        u.username = ''
      }
      API.login(u).then(res => {
        let code = res.data.code
        switch (code) {
          case ErrCode.OK:
            message.success('登录成功!')
            storage.setToken(res.headers[TOKEN])
            storage.setRefreshToken(res.headers[REFRESH_TOKEN])
            dispatch(setMyInfo(res.data.data))
            setTimeout(() => {
              navigate('/app', { replace: true })
            }, 10)
            return
          case ErrCode.InvalidPassword:
            message.error('密码错误!')
            return
          case ErrCode.UserNotExists:
            message.error('用户不存在!')
            return
        }
      })
    })
  return (
    <>
      <div className="flex h-full">
        <div className="flex-1 relative" style={{ background: 'linear-gradient(90deg, #034AA9 0%, #2660AE 100%)' }}>
          <div className="absolute flex" style={{ fontSize: 48, fontWeight: 700, color: 'white', left: 120, top: 120 }}>
            <img style={{ width: 80, height: 80, marginRight: 24 }} src="/logo.png" />
            <div>森盟价格管理系统</div>
          </div>
          <img className="absolute" style={{ left: 200, top: '30%' }} src={bg}></img>
        </div>
        <div style={{ width: 720, padding: '0 130px' }}>
          <div style={{ fontSize: 36, marginTop: 120, marginBottom: 200 }}>登录</div>
          <div className="flex flex-col px-4 w-96  gap-y-5" style={{ width: 400 }}>
            <Form form={loginForm} autoComplete="on" onFinish={login} layout="vertical" requiredMark={false}>
              <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: '请输入用户名' }]}
                getValueFromEvent={v => {
                  return v.target.value.trim()
                }}
              >
                <Input allowClear size="large" placeholder="请输入用户名或手机号" />
              </Form.Item>
              <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码' }]}
                getValueFromEvent={v => {
                  return v.target.value.trim()
                }}
              >
                <Input.Password size="large" placeholder="请输入密码" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} size="large" style={{ width: '100%' }}>
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div style={{ fontSize: 16, marginTop: 120 }}>深圳市森盟科技有限公司</div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
