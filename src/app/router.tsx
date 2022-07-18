import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from 'pages/login/login'
import HomePage from 'pages/home/home'
import UserComponent from 'pages/user/user'
import MaterialsPage from 'pages/materials/materials'
import SupplierPage from 'pages/supplier/supplier'
import OperationPage from 'pages/operation/operation'
import PricePage from 'pages/price/price'
import AppHome from 'pages/app/app'
import { isAlive } from 'api/storage'
import PriceAuditPage from 'pages/price_audit/priceAudit'

const Router = () => {
  const routes = [
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/',
      element: <HomePage />,
      needLogin: true,
      redirect: '/app',
      children: [
        {
          path: '/app',
          element: <AppHome />
        },
        {
          path: '/materials',
          element: <MaterialsPage />
        },
        {
          path: '/user',
          element: <UserComponent />
        },
        {
          path: '/supplier',
          element: <SupplierPage />
        },
        {
          path: '/operation',
          element: <OperationPage />
        },
        {
          path: '/price',
          element: <PricePage />
        }
      ]
    }
  ]

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          >
            <Route path="/" element={<Navigate to="app" />} />
            <Route path="app" element={<AppHome />}></Route>
            <Route path="user" element={<UserComponent />}></Route>
            <Route path="materials" element={<MaterialsPage />} />
            <Route path="supplier" element={<SupplierPage />} />
            <Route path="operation" element={<OperationPage />} />
            <Route path="price" element={<PricePage />} />
            <Route path="price/audit" element={<PriceAuditPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

const RequireAuth = ({ children }) => {
  if (isAlive()) {
    console.log('has login')
    return children
  }
  console.log('not login')

  return <Navigate to={'/login'} replace />
}

export default Router
