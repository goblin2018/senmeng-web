import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from 'api/user'

export interface UsersState {
  showModal?: boolean
  items?: User[]
  total?: number
}

const initialState: UsersState = {
  showModal: false,
  items: [],
  total: 0
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    openUserModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload
    },
    updateUserList: {
      reducer(state, action: PayloadAction<UsersState>) {
        state.items = action.payload.items
        state.total = action.payload.total
      },
      prepare(items: User[], total: number) {
        return {
          payload: {
            items,
            total
          }
        }
      }
    }
  }
})

export const { openUserModal, updateUserList } = usersSlice.actions
export default usersSlice.reducer
