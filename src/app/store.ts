import { configureStore } from '@reduxjs/toolkit'
import suppliersSlice from 'pages/supplier/suppliersSlice'

const store = configureStore({
  reducer: {
    suppliers: suppliersSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
