import { configureStore } from '@reduxjs/toolkit'
import mySlice from 'pages/login/mySlice'
import materialsSlice from 'pages/materials/materialsSlice'
import priceSlice from 'pages/price/priceSlice'
import suppliersSlice from 'pages/supplier/suppliersSlice'
import usersSlice from 'pages/user/usersSlice'
import logger from 'redux-logger'

const store = configureStore({
  reducer: {
    users: usersSlice,
    materials: materialsSlice,
    suppliers: suppliersSlice,
    price: priceSlice,
    my: mySlice
  }
  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
