import { LoginOutlined } from '@ant-design/icons'
import { Button, notification, Popconfirm, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import API from 'api'
import { UserLevel, UserStatus } from 'api/constants'
import { User } from 'api/user'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { updateUserList } from './usersSlice'
import React from 'react'
import { useEffect } from 'react'

const UserTableComponent = () => {
  const dispatch = useAppDispatch()

  const items = useAppSelector(state => state.users.items)

  useEffect(() => {
    console.log('before get data')

    API.listUser().then(res => {
      console.log('after get data')

      let data = res.data
      let items = res.data.items
      items.forEach(it => {
        it.key = it.id
      })
      dispatch(updateUserList(data.items, data.total))
    })
  }, [])

  const columns: ColumnsType<User> = [
    {
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      width: 80,
      align: 'center',
      render: (text, record, index) => index + 1
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      align: 'center'
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: 100,
      align: 'center'
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 100,
      align: 'center'
    },
    {
      title: '角色',
      dataIndex: 'level',
      key: 'level',
      width: 100,
      align: 'center',
      render: text => {
        if (text === UserLevel.Normal) {
          return <Tag>普通用户</Tag>
        }
        return <Tag>管理员</Tag>
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      align: 'center',
      render: text => {
        if (text === UserStatus.Normal) {
          return <Tag>正常</Tag>
        }
        return <Tag>禁用</Tag>
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => {
        return (
          <div className="flex ">
            <Button type="link">编辑</Button>
            <Popconfirm title="确定删除员工？" onConfirm={() => delUser(record)}>
              <Button danger type="text">
                删除
              </Button>
            </Popconfirm>
            <Button danger type="text">
              禁用
            </Button>
          </div>
        )
      }
    }
  ]

  const delUser = (user: User) => {
    API.delUser(user).then(res => {
      notification.success({
        message: '删除用户 ' + user.name + ' 成功。'
      })
    })
  }

  return (
    <>
      <Table bordered columns={columns} dataSource={items} />
    </>
  )
}

export default UserTableComponent
