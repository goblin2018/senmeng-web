import React from 'react'
import { Button, Pagination } from 'antd'
import UserModal from './user_modal'
import UserTableComponent from './user_table'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { changeUserPage, listUser, openUserModal, setEditUser } from './usersSlice'

const UserComponent = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const currentPage = useAppSelector(state => state.users.currentPage)
  const total = useAppSelector(state => state.users.total)
  const changePage = page => {
    dispatch(changeUserPage(page))
    dispatch(listUser())
  }
  return (
    <div className="relative h-full">
      <div className="mb-6">
        <Button
          onClick={() => {
            dispatch(setEditUser(false))
          }}
        >
          添加用户
        </Button>
      </div>
      <UserTableComponent />
      <UserModal />
      <div className="flex justify-end absolute w-full h-12 items-center pr-16 bottom-0">
        <Pagination current={currentPage} total={total} onChange={changePage} />
      </div>
    </div>
  )
}

export default UserComponent
