import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from 'pages/login/login'
import HomePage from 'pages/home/home'
import UserComponent from 'pages/user/user'
import MaterialsPage from 'pages/materials/materials'
import SupplierPage from 'pages/supplier/supplier'
import OperationPage from 'pages/operation/operation'
import PricePage from 'pages/price/price'
import AppHome from 'pages/app/app'

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="" element={<HomePage />}>
            <Route path="app" element={<AppHome />}></Route>
            <Route path="user" element={<UserComponent />}></Route>
            <Route path="materials" element={<MaterialsPage />} />
            <Route path="supplier" element={<SupplierPage />} />
            <Route path="operation" element={<OperationPage />} />
            <Route path="price" element={<PricePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Router
