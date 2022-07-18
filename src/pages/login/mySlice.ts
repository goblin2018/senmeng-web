import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User, UserLevel } from 'api/user'
import { RootState } from 'app/store'

interface MyState {
  user?: User
  showInfoModal?: boolean
  showPasswordModal?: boolean
}

const initialState: MyState = {
  showInfoModal: false,
  showPasswordModal: false
}

const mySlice = createSlice({
  name: 'my',
  initialState,
  reducers: {
    setMyInfo: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    }
  }
})

export const { setMyInfo } = mySlice.actions
export const iAmAdmin = (state: RootState) => state.my.user?.level === UserLevel.Admin
export default mySlice.reducer
