import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import API from 'api'
import { User } from 'api/user'
import { RootState } from 'app/store'

export interface UsersState {
  showModal?: boolean
  items?: User[]
  total?: number
  currentPage?: number
  isEdit?: boolean
  editUser?: User
}

const initialState: UsersState = {
  showModal: false,
  items: [],
  total: 0,
  currentPage: 1,
  isEdit: false
}

export const listUser = createAsyncThunk(
  'users/listUser',

  async (_, { getState }) => {
    const state = getState() as RootState
    let { currentPage } = state.users
    const res = await API.listUser({
      offset: (currentPage! - 1) * 10,
      limit: 10
    })
    return res.data
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    changeUserPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setEditUser: {
      reducer(state, action: PayloadAction<UsersState>) {
        const { isEdit, editUser } = action.payload
        if (isEdit) {
          state.editUser = editUser
        }
        state.isEdit = isEdit
        state.showModal = true
      },
      prepare(isEdit: boolean, editUser?: User) {
        return {
          payload: {
            isEdit,
            editUser
          }
        }
      }
    },
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
  },

  // extra
  extraReducers: builder => {
    builder.addCase(listUser.fulfilled, (state, action) => {
      let { items, total } = action.payload
      if (items == null) {
        state.items = []
      } else {
        items.forEach(it => (it.key = it.id))
      }
      state.items = items
      state.total = total
    })
  }
})

export const { setEditUser, changeUserPage, openUserModal, updateUserList } = usersSlice.actions
export default usersSlice.reducer
