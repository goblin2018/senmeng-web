import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const [loginForm] = Form.useForm()
  const navigate = useNavigate()

  const login = () => {
    console.log('get login')
    navigate('/home')
  }
  return (
    <>
      <div className="flex flex-col mx-auto px-4 w-96 justify-center gap-y-5 mt-20">
        <Form form={loginForm} autoComplete="on" onFinish={login}>
          <Form.Item label="用户名" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default LoginPage
