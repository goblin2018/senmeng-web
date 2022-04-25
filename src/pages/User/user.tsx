import React from 'react'
import { Button } from 'antd'
import AddUserComponent from './add_user'
import UserTableComponent from './user_table'
import { useNavigate } from 'react-router-dom'

const UserComponent = () => {
  const navigate = useNavigate()
  return (
    <>
      <Button
        onClick={() => {
          navigate('/user/add')
        }}
      >
        添加用户
      </Button>
      This is user
      <UserTableComponent />
    </>
  )
}

export default UserComponent
