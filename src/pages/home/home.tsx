import React, { useState } from 'react'
import { Button, Dropdown, Layout, Menu, Table } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import { Content, Footer, Header } from 'antd/lib/layout/layout'
import { Outlet, useNavigate } from 'react-router-dom'
import Sider from 'antd/lib/layout/Sider'
import SubMenu from 'antd/lib/menu/SubMenu'
import { AuditOutlined, CodepenOutlined, ProjectOutlined, UserOutlined } from '@ant-design/icons'

const HomePage = () => {
  const navigate = useNavigate()
  const toUser = () => {
    navigate('/user')
  }
  const menu = (
    <Menu>
      <Menu.Item>ok</Menu.Item>
    </Menu>
  )

  const [currentProject, setCurrentProject] = useState()

  return (
    <>
      <Layout className="h-full">
        <Header className="bg-white">
          <div className="flex items-center justify-center">
            <Dropdown overlay={menu} placement="bottomCenter">
              <Button>{currentProject ? currentProject : '选择项目'}</Button>
            </Dropdown>
            <div onClick={toUser}>
              <Avatar className="cursor-pointer"></Avatar>
            </div>
          </div>
        </Header>
        <Layout className="flex-row">
          <Sider theme="light" className="bg-cyan-200">
            <Menu mode="inline">
              <Menu.Item
                key="materials"
                icon={<CodepenOutlined />}
                onClick={() => {
                  navigate('/materials')
                }}
              >
                物料管理
              </Menu.Item>
              <Menu.Item
                key="supplier"
                icon={<AuditOutlined />}
                onClick={() => {
                  navigate('/supplier')
                }}
              >
                供应商管理
              </Menu.Item>
              <Menu.Item
                key="user"
                icon={<UserOutlined />}
                onClick={() => {
                  navigate('/user')
                }}
              >
                员工管理
              </Menu.Item>
            </Menu>
          </Sider>
          <Content className="bg-cyan-50 p-6">
            <Outlet />
          </Content>
        </Layout>
        <Footer>footer</Footer>
      </Layout>
    </>
  )
}

export default HomePage
