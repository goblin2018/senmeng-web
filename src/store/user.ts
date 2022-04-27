import { Action } from 'api/action'
import { ActionTypes } from 'api/constants'
import { User } from 'api/user'

const initState: User = {
  id: 0,
  name: '',
  password: '',
  username: '',
  status: 1,
  level: 1
}

const userReducer = (state = initState, action: Action<User>) => {
  switch (action.type) {
    case ActionTypes.SaveUser:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default userReducer
