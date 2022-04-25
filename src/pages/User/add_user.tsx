import React from 'react'
import { LeftOutlined } from '@ant-design/icons'
import { Alert, Button, Form, Input, Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import API from 'api'

const { Item } = Form

const AddUserComponent = () => {
  const navigate = useNavigate()
  const [userForm] = Form.useForm()

  const submit = () => {
    console.log(userForm.getFieldsValue())
    let user = userForm.getFieldsValue()
    API.addUser(user)
  }
  return (
    <Modal >
      添加用户
      <Button shape="circle" icon={<LeftOutlined />} onClick={() => navigate(-1)}></Button>
      <Form labelCol={{ span: 2 }} wrapperCol={{ span: 16 }} form={userForm} onFinish={submit}>
        <Item name="username" label="用户名">
          <Input />
        </Item>
        <Alert message="密码默认为： 12345678，用户登录之后自行修改密码。" type="info" />
        <Item name="name" label="姓名">
          <Input />
        </Item>
        <Item name="phone" label="手机号码">
          <Input />
        </Item>
        <Item name="email" label="邮箱">
          <Input />
        </Item>
        <Item name="dept" label="部门">
          <Input />
        </Item>
        <Item name="post" label="职位">
          <Input />
        </Item>
        <Item>
          <Button htmlType="submit">提交</Button>
        </Item>
      </Form>
    </Modal>
  )
}

export default AddUserComponent
