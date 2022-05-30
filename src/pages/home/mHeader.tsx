import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Form, Input, Menu, Modal, notification } from 'antd'
import API from 'api'
import { storage } from 'api/storage'
import { UpdatePasswordReq, User } from 'api/user'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { setMyInfo } from 'pages/login/mySlice'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { notifyCode } from 'utils/errcode'

const { Item } = Form

const MHeader = () => {
  const my = useAppSelector(s => s.my.user)
  const dispatch = useAppDispatch()

  const [showEditInfo, setShowEditInfo] = useState(false)
  const [showPasswordModal, setShowPassowrdModal] = useState(false)
  const [infoForm] = Form.useForm()
  const [pForm] = Form.useForm()

  const navigate = useNavigate()
  useEffect(() => {
    if (showPasswordModal) {
      pForm.resetFields()
    }
  }, [showPasswordModal])

  const submitInfo = async () => {
    let r = await infoForm.validateFields()
    let nu: User = infoForm.getFieldsValue()

    if (nu.username === my?.username && nu.name === my?.name && nu.phone === my?.phone) {
      notification.info({
        message: '通知',
        description: '未修改用户信息。'
      })
      return
    }

    nu.id = my!.id
    API.updateUser(nu).then(res => {
      let r = notifyCode(res.data.code, `修改用户 ${nu.name} 成功。`, `修改用户 ${nu.name} 失败, 存在相同信息的用户。`)
      console.log('update user', res.data.data)

      if (r) {
        // 更新信息
        dispatch(setMyInfo(res.data.data))
        setShowEditInfo(false)
      }
    })
  }
  const submitPassword = async () => {
    let r = pForm.validateFields()
    let opt = pForm.getFieldsValue() as UpdatePasswordReq
    if (opt.new_password !== opt.confirm_password) {
      notification.error({ message: '新密码错误', description: '两次输入密码不一致！' })
      return
    }
    opt.action = 'update'
    opt.id = my!.id
    API.updatePassword(opt).then(res => {
      // 修改密码成功
      let code = res.data.code
      let r = notifyCode(code, '修改密码成功，下次可使用新密码登录。', '修改密码失败，旧密码输入错误。')
      if (r) {
        setShowPassowrdModal(false)
      }
    })
  }

  useEffect(() => {
    if (showEditInfo) {
      infoForm.setFieldsValue(my)
    }
  }, [showEditInfo])

  const exit = () => {
    storage.clear()
    setTimeout(() => {
      navigate('/login', { replace: true })
    })
  }

  const menu = (
    <Menu
      items={[
        {
          label: (
            <Button type="text" onClick={() => setShowEditInfo(true)}>
              修改信息
            </Button>
          ),
          key: '0'
        },
        {
          label: (
            <Button type="text" onClick={() => setShowPassowrdModal(true)}>
              修改密码
            </Button>
          ),
          key: '1'
        },
        {
          label: (
            <Button type="text" onClick={exit}>
              退出
            </Button>
          ),
          key: '2'
        }
      ]}
    />
  )

  return (
    <>
      <div className="flex h-full items-center justify-center relative">
        <div className="text-xl font-semibold">森盟价格管理系统</div>
        <div className="absolute right-0">
          <Dropdown overlay={menu}>
            <div className="flex items-center">
              <Avatar className="cursor-pointer mr-3" icon={<UserOutlined />} />
              <div style={{ minWidth: 40 }}>{my?.name}</div>
            </div>
          </Dropdown>
        </div>

        <Modal
          title="修改个人信息"
          visible={showEditInfo}
          onCancel={() => {
            setShowEditInfo(false)
          }}
          onOk={submitInfo}
        >
          <Form form={infoForm} labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
            <Item
              label="用户名"
              name={'username'}
              rules={[{ required: true, message: '请输入用户名' }]}
              getValueFromEvent={v => {
                return v.target.value.trim()
              }}
            >
              <Input />
            </Item>
            <Item
              label="姓名"
              name={'name'}
              rules={[{ required: true, message: '请输入姓名' }]}
              getValueFromEvent={v => {
                return v.target.value.trim()
              }}
            >
              <Input />
            </Item>
            <Item
              label="手机号码"
              name={'phone'}
              rules={[{ required: true, message: '请输入手机号' }]}
              getValueFromEvent={v => {
                return v.target.value.trim()
              }}
            >
              <Input />
            </Item>
          </Form>
        </Modal>
        <Modal
          title="修改密码"
          visible={showPasswordModal}
          onCancel={() => {
            setShowPassowrdModal(false)
          }}
          onOk={submitPassword}
        >
          <Form form={pForm} labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
            <Item
              label="旧密码"
              name={'old_password'}
              rules={[{ required: true, message: '请输入旧密码' }]}
              getValueFromEvent={v => {
                return v.target.value.trim()
              }}
            >
              <Input.Password />
            </Item>
            <Item
              label="新密码"
              name={'new_password'}
              rules={[{ required: true, message: '请输入新密码' }]}
              getValueFromEvent={v => {
                return v.target.value.trim()
              }}
            >
              <Input.Password />
            </Item>
            <Item
              label="重复新密码"
              name={'confirm_password'}
              rules={[{ required: true, message: '请重复新密码' }]}
              getValueFromEvent={v => {
                return v.target.value.trim()
              }}
            >
              <Input.Password />
            </Item>
          </Form>
        </Modal>
      </div>
    </>
  )
}

export default MHeader
