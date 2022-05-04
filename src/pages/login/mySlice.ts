import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from 'api/user'

type MyState = User & {
  showInfoModal?: boolean
  showPasswordModal?: boolean
}

const initialState: MyState = {
  id: 0,
  name: '',
  username: '',
  status: 1,
  level: 1,
  showInfoModal: false,
  showPasswordModal: false
}

const mySlice = createSlice({
  name: 'my',
  initialState,
  reducers: {
    setMyInfo: (state, action: PayloadAction<User>) => {
      state = {
        ...state,
        ...action.payload
      }
    }
  }
})

export const { setMyInfo } = mySlice.actions
export default mySlice.reducer
