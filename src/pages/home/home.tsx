import React, { useState } from 'react'
import { Button, Dropdown, Layout, Menu, Table } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import { Content, Footer, Header } from 'antd/lib/layout/layout'
import { Outlet, useNavigate } from 'react-router-dom'
import Sider from 'antd/lib/layout/Sider'
import {
  AuditOutlined,
  CodepenOutlined,
  HomeOutlined,
  MonitorOutlined,
  ProjectOutlined,
  UserOutlined
} from '@ant-design/icons'

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
          <div className="flex h-full items-center justify-center relative">
            <div className="text-xl font-semibold">森盟价格管理系统</div>
            <div className="absolute right-0">
              <Avatar className="cursor-pointer" icon={<UserOutlined />} />
            </div>
          </div>
        </Header>
        <Layout className="flex-row">
          <Sider theme="light" className="bg-cyan-200">
            <Menu mode="inline" defaultSelectedKeys={['app']}>
              <Menu.Item
                key="app"
                icon={<HomeOutlined />}
                onClick={() => {
                  navigate('/app')
                }}
              >
                首页
              </Menu.Item>
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
              <Menu.Item
                key="operation"
                icon={<MonitorOutlined />}
                onClick={() => {
                  navigate('/operation')
                }}
              >
                操作记录
              </Menu.Item>
            </Menu>
          </Sider>
          <Content className="bg-cyan-50 p-6">
            <Outlet />
          </Content>
        </Layout>
        <Footer>
          <div className="text-center">深圳市森盟科技有限公司</div>
        </Footer>
      </Layout>
    </>
  )
}

export default HomePage
