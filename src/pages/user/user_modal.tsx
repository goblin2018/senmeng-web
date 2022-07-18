import React, { useState } from 'react'
import { Alert, Form, Input, Modal, notification, Radio } from 'antd'
import API from 'api'
import { DefaultPassword } from 'api/constants'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { listUser, openUserModal } from './usersSlice'
import { notifyCode } from 'utils/errcode'
import { User, UserLevel } from 'api/user'
const { Item } = Form

const UserModal = () => {
  const [userForm] = Form.useForm()
  const isEdit = useAppSelector(state => state.users.isEdit)

  const submit = () =>
    userForm.validateFields().then(() => {
      if (isEdit) {
        let nU = {
          ...editUser,
          ...userForm.getFieldsValue()
        } as User

        if (
          nU.name === editUser?.name &&
          nU.level === editUser?.level &&
          nU.phone === editUser.phone &&
          nU.username === editUser.username
        ) {
          notification.info({
            message: '通知',
            description: '未修改用户信息。'
          })
          cancel()
          return
        }

        API.updateUser(nU).then(res => {
          let r = notifyCode(
            res.data.code,
            `修改用户 ${nU.name} 成功。`,
            `修改用户 ${nU.name} 失败, 存在相同信息的用户。`
          )

          if (r) {
            dispatch(listUser())
            cancel()
          }
        })
      } else {
        let user = userForm.getFieldsValue()
        API.addUser(user).then(res => {
          let r = notifyCode(
            res.data.code,
            '添加用户 ' + user.name + ' 成功。',
            `添加用户 ${user.name} 失败，存在相同的用户信息。`
          )
          if (r) {
            dispatch(listUser())
            cancel()
          }
        })
      }
    })
  const dispatch = useAppDispatch()
  const cancel = () => {
    dispatch(openUserModal(false))
  }
  const visible = useAppSelector(state => state.users.showModal)
  const editUser = useAppSelector(state => state.users.editUser)
  const [inputs, setInputs] = useState<HTMLInputElement[]>([])

  useEffect(() => {
    if (visible) {
      let tmpIs: HTMLInputElement[] = []
      const is = document.getElementsByClassName('iii')
      for (let i = 0; i < is.length; i++) {
        tmpIs.push(is[i] as HTMLInputElement)
      }
      setInputs(tmpIs)
      setTimeout(() => {
        tmpIs[0].focus()
      })

      if (isEdit) {
        userForm.setFieldsValue(editUser)
      }
    } else {
      userForm.resetFields()
    }
  }, [visible])

  // 捕获enter键
  const handleKeyUp = e => {
    if (e.keyCode !== 13) {
      return
    }
    let index = inputs.indexOf(e.target)
    if (index < inputs.length - 1) {
      let it = inputs[index + 1]
      it.focus()
    } else {
      submit()
    }
  }

  return (
    <Modal
      title={isEdit ? '编辑用户' : '添加用户'}
      visible={visible}
      onCancel={cancel}
      onOk={submit}
      getContainer={false}
      forceRender
      maskClosable={false}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        form={userForm}
        onFinish={submit}
        initialValues={{ level: UserLevel.Normal }}
        onKeyUp={handleKeyUp}
      >
        <Item
          name="username"
          label="用户名"
          rules={[{ required: true, message: '请输入用户名' }]}
          getValueFromEvent={v => {
            return v.target.value.trim()
          }}
        >
          <Input className="iii" />
        </Item>
        <div className="mb-6 ml-6 mr-16" style={{ display: isEdit ? 'none' : '' }}>
          <Alert message={`默认密码： ${DefaultPassword}，用户登录之后自行修改密码。`} type="info" />
        </div>
        <Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名' }]}
          getValueFromEvent={v => {
            return v.target.value.trim()
          }}
        >
          <Input className="iii" />
        </Item>
        <Item
          name="phone"
          label="手机号码"
          rules={[{ required: true, message: '请输入手机号' }]}
          getValueFromEvent={v => {
            return v.target.value.trim()
          }}
        >
          <Input className="iii" />
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
