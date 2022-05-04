import { configureStore } from '@reduxjs/toolkit'
import mySlice from 'pages/login/mySlice'
import materialsSlice from 'pages/materials/materialsSlice'
import priceSlice from 'pages/price/priceSlice'
import suppliersSlice from 'pages/supplier/suppliersSlice'
import usersSlice from 'pages/user/usersSlice'

const store = configureStore({
  reducer: {
    users: usersSlice,
    materials: materialsSlice,
    suppliers: suppliersSlice,
    price: priceSlice,
    my: mySlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
