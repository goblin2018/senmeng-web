import { configureStore } from '@reduxjs/toolkit'
import materialsSlice from 'pages/materials/materialsSlice'
import suppliersSlice from 'pages/supplier/suppliersSlice'
import usersSlice from 'pages/user/usersSlice'

const store = configureStore({
  reducer: {
    suppliers: suppliersSlice,
    users: usersSlice,
    materials: materialsSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
