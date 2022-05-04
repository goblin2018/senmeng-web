import React, { useEffect, useState } from 'react'
import { Layout, Menu, MenuProps, Table } from 'antd'
import { Content, Footer, Header } from 'antd/lib/layout/layout'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Sider from 'antd/lib/layout/Sider'
import { AuditOutlined, CodepenOutlined, HomeOutlined, MonitorOutlined, UserOutlined } from '@ant-design/icons'
import MHeader from './mHeader'

const HomePage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedKey, setSelectedKey] = useState('')
  useEffect(() => {
    setSelectedKey(location.pathname)
  }, [location.pathname])

  const items: MenuProps['items'] = [
    {
      label: '首页',
      key: '/app',
      icon: <HomeOutlined />,
      onClick: () => {
        navigate('/app')
      }
    },

    {
      label: '物料管理',
      key: '/materials',
      icon: <CodepenOutlined />,
      onClick: () => {
        navigate('/materials')
      }
    },
    {
      label: '供应商管理',
      key: '/supplier',
      icon: <AuditOutlined />,
      onClick: () => {
        navigate('/supplier')
      }
    },
    {
      label: '员工管理',
      key: '/user',
      icon: <UserOutlined />,
      onClick: () => {
        navigate('/user')
      }
    },
    {
      label: '操作记录',
      key: '/operation',
      icon: <MonitorOutlined />,
      onClick: () => {
        navigate('/operation')
      }
    }
  ]

  return (
    <>
      <Layout className="h-full">
        <Header style={{ backgroundColor: '#fafafa', color: '#333333', boxShadow: '0px 3px 3px #c8c8c8' }}>
          <MHeader />
        </Header>
        <Layout className="flex-row">
          <Sider theme="light">
            <Menu mode="inline" selectedKeys={[selectedKey]} items={items}></Menu>
          </Sider>
          <Content className="bg-white p-6">
            <Outlet />
          </Content>
        </Layout>
        <Footer>
          <div className="text-center" style={{ backgroundColor: '#fafafa', color: '#333333' }}>
            深圳市森盟科技有限公司
          </div>
        </Footer>
      </Layout>
    </>
  )
}

export default HomePage
