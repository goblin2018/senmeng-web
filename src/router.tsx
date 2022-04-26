import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from 'pages/login/login'
import HomePage from 'pages/home/home'
import UserComponent from 'pages/User/user'
import AddUserModal from 'pages/User/add_user'

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="" element={<HomePage />}>
            <Route path="user" element={<UserComponent />}></Route>
            <Route path="user/add" element={<AddUserModal />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router
