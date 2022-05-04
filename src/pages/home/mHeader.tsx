import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Form, Input, Menu, Modal } from 'antd'
import { useAppSelector } from 'app/hooks'
import React, { useEffect, useState } from 'react'

const { Item } = Form

const MHeader = () => {
  const my = useAppSelector(s => s.my)

  const [showEditInfo, setShowEditInfo] = useState(false)
  const [showPasswordModal, setShowPassowrdModal] = useState(false)
  const [infoForm] = Form.useForm()

  const submitInfo = () => {}
  const submitPassword = () => {}

  useEffect(() => {
    console.log('showEditInfo', showEditInfo)
  }, [showEditInfo])

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
            <div className="flex">
              <Avatar className="cursor-pointer" icon={<UserOutlined />} />
              <div style={{ minWidth: 40 }}>{my.name}</div>
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
          <Form form={infoForm} labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
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
