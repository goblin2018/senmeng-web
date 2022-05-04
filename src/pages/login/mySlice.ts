import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from 'api/user'

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
export default mySlice.reducer
