import { User } from 'api/user'
import { combineReducers } from 'redux'
import userReducer from 'store/reducers/user'
import materialsReducer, { RMaterials } from './materials'
import usersReducer, { RUsers } from './users'

export interface State {
  user: User
  users: RUsers
  materials: RMaterials
}

const rootReducer = combineReducers<State>({
  user: userReducer,
  users: usersReducer,
  materials: materialsReducer
})

export default rootReducer
