import { User } from 'api/user'
import { combineReducers } from 'redux'
import userReducer from 'store/reducers/user'
import usersReducer, { Users } from './users'

export interface State {
  user: User
  users: Users
}

const rootReducer = combineReducers<State>({
  user: userReducer,
  users: usersReducer
})

export default rootReducer
