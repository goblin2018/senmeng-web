import { Button, notification, Popconfirm, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import API from 'api'
import { DefaultPassword } from 'api/constants'
import { User, UserLevel } from 'api/user'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { changeUserPage, listUser, setEditUser, updateUserList } from './usersSlice'
import React from 'react'
import { useEffect } from 'react'
import { iAmAdmin } from 'pages/login/mySlice'

const UserTableComponent = () => {
  const dispatch = useAppDispatch()

  const items = useAppSelector(state => state.users.items)
  const isAdmin = useAppSelector(iAmAdmin)

  useEffect(() => {
    dispatch(listUser())
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
      width: 120,
      align: 'center'
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      width: 200,
      align: 'center'
    },
    {
      title: '角色',
      dataIndex: 'level',
      key: 'level',
      width: 120,
      align: 'center',
      render: text => {
        if (text === UserLevel.Normal) {
          return <Tag color="#2db7f5">普通用户</Tag>
        }
        return <Tag color="#87d068">管理员</Tag>
      }
    },
    // {
    //   title: '状态',
    //   dataIndex: 'status',
    //   key: 'status',
    //   width: 100,
    //   align: 'center',
    //   render: text => {
    //     if (text === UserStatus.Normal) {
    //       return <Tag>正常</Tag>
    //     }
    //     return <Tag>禁用</Tag>
    //   }
    // },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => {
        if (!isAdmin) {
          return <></>
        }
        return (
          <div className="flex ">
            <Button type="link" onClick={() => editUser(record)}>
              编辑
            </Button>
            <Popconfirm title="确定删除员工？" onConfirm={() => delUser(record)}>
              <Button danger type="text">
                删除
              </Button>
            </Popconfirm>
            <Popconfirm
              title={
                <>
                  <div>确定重置用户密码？</div>
                  <div>默认密码为 {DefaultPassword}。</div>
                </>
              }
              onConfirm={() => resetPassword(record)}
            >
              <Button type="link">重置密码</Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]
  const editUser = (user: User) => {
    dispatch(setEditUser(true, user))
  }

  const resetPassword = (user: User) => {
    API.updatePassword({
      id: user.id,
      action: 'reset'
    }).then(res => {
      notification.success({
        message: '操作成功',
        description: (
          <>
            <div>重置用户 {user.name} 密码成功。</div>
            <div>新密码为 {DefaultPassword} 。</div>
          </>
        )
      })
    })
  }

  const currentPage = useAppSelector(state => state.users.currentPage)
  const delUser = (user: User) => {
    API.delUser(user).then(res => {
      notification.success({
        message: '操作成功',
        description: '删除用户 ' + user.name + ' 成功。'
      })
      if (items?.length === 1 && currentPage! > 1) {
        dispatch(changeUserPage(currentPage! - 1))
      }
      dispatch(listUser())
    })
  }

  return (
    <>
      <Table bordered columns={columns} dataSource={items} pagination={false} size="middle" />
    </>
  )
}

export default UserTableComponent
