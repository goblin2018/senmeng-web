import React from 'react'
import { Button } from 'antd'
import UserModal from './user_modal'
import UserTableComponent from './user_table'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'app/hooks'
import { openUserModal } from './usersSlice'

const UserComponent = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
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
