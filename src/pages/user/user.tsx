import React from 'react'
import { Button } from 'antd'
import UserModal from './user_modal'
import UserTableComponent from './user_table'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { openUserModal } from 'store/reducers/users'

const UserComponent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <>
      <Button
        onClick={() => {
          dispatch(openUserModal(true))
        }}
      >
        添加用户
      </Button>
      <UserTableComponent />
      <UserModal />
    </>
  )
}

export default UserComponent
