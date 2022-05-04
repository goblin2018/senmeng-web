import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import bg from './bg.png'
const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const [loginForm] = Form.useForm()
  const navigate = useNavigate()

  const login = () =>
    loginForm.validateFields().then(() => {
      console.log('get login')
      navigate('/app')
    })
  return (
    <>
      <div className="flex h-full">
        <div className="flex-1 relative" style={{ background: 'linear-gradient(90deg, #034AA9 0%, #2660AE 100%)' }}>
          <div className="absolute" style={{ fontSize: 48, fontWeight: 700, color: 'white', left: 120, top: 120 }}>
            森盟价格管理系统
          </div>
          <img className="absolute" style={{ left: 200, top: '30%' }} src={bg}></img>
        </div>
        <div style={{ width: 720, padding: '0 130px' }}>
          <div style={{ fontSize: 36, marginTop: 120, marginBottom: 200 }}>登录</div>
          <div className="flex flex-col  px-4 w-96  gap-y-5" style={{ width: 400 }}>
            <Form form={loginForm} autoComplete="on" onFinish={login} layout="vertical">
              <Form.Item label="用户名" name="username">
                <Input allowClear size="large" />
              </Form.Item>
              <Form.Item label="密码" name="password">
                <Input.Password size="large" />
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
