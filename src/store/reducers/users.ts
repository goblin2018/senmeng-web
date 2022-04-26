import { Action } from 'api/action'
import { User } from 'api/user'

const Actions = {
  OpenUserModal: 'OpenUserModal',
  UpdateUserList: 'UpdateUserList'
}

export interface Users {
  showModal?: boolean
  items?: User[]
  total?: number
}

const initState: Users = {
  showModal: false,
  items: [],
  total: 0
}

export const openUserModal = (open: boolean): Action<Users> => ({
  type: Actions.OpenUserModal,
  payload: {
    showModal: open
  }
})

export const UpdateUserList = (items: User[], total: number): Action<Users> => ({
  type: Actions.UpdateUserList,
  payload: {
    items: items,
    total: total
  }
})

const usersReducer = (state = initState, action: Action<Users>): Users => {
  switch (action.type) {
    case Actions.OpenUserModal:
      return {
        ...state,
        showModal: action.payload?.showModal
      }
    case Actions.UpdateUserList:
      return {
        ...state,
        items: action.payload?.items,
        total: action.payload?.total
      }
    default:
      return state
  }
}

export default usersReducer
