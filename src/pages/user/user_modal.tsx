import React from 'react'
import { LeftOutlined } from '@ant-design/icons'
import { Alert, Button, Form, Input, Modal, notification, Radio } from 'antd'
import { useNavigate } from 'react-router-dom'
import API from 'api'
import { DefaultPassword, ErrCode, UserLevel } from 'api/constants'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { openUserModal } from './usersSlice'
const { Item } = Form

const UserModal = () => {
  const navigate = useNavigate()
  const [userForm] = Form.useForm()

  const submit = () =>
    userForm.validateFields().then(() => {
      let user = userForm.getFieldsValue()

      API.addUser(user).then(res => {
        const code = res.data.code
        switch (code) {
          case ErrCode.DBError:
            // 提示用户已存在
            notification.error({
              message: '用户已存在，请勿重复添加。'
            })
            break
          default:
            // 提示成功
            notification.success({
              message: '添加用户 ' + user.name + ' 成功。'
            })
            cancel()
            break
        }
      })
    })
  const dispatch = useAppDispatch()
  const cancel = () => {
    dispatch(openUserModal(false))
  }
  const visible = useAppSelector(state => state.users.showModal)
  useEffect(() => {
    if (visible) {
      userForm.resetFields()
    }
  }, [visible])

  return (
    <Modal title="添加用户" visible={visible} onCancel={cancel} onOk={submit} getContainer={false}>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        form={userForm}
        onFinish={submit}
        initialValues={{ level: UserLevel.Normal }}
      >
        <Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input />
        </Item>
        <div className="mb-6 ml-6 mr-16">
          <Alert message={`默认密码： ${DefaultPassword}，用户登录之后自行修改密码。`} type="info" />
        </div>
        <Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
          <Input />
        </Item>
        <Item name="phone" label="手机号码" rules={[{ required: true, message: '请输入手机号' }]}>
          <Input />
        </Item>

        <Item name="level" label="角色" rules={[{ required: true, message: '请选择角色' }]}>
          <Radio.Group>
            <Radio value={UserLevel.Normal}>普通用户</Radio>
            <Radio value={UserLevel.Admin}>管理员</Radio>
          </Radio.Group>
        </Item>
      </Form>
    </Modal>
  )
}

export default UserModal
