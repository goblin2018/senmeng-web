import { User } from 'api/user'
import { combineReducers } from 'redux'
import userReducer from 'store/user'
import materialsReducer, { RMaterials } from './materials'
import suppliersReducer, { RSuppliers } from './suppliers'
import usersReducer, { RUsers } from './users'

export interface State {
  user: User
  users: RUsers
  materials: RMaterials
  suppliers: RSuppliers
}

const rootReducer = combineReducers<State>({
  user: userReducer,
  users: usersReducer,
  materials: materialsReducer,
  suppliers: suppliersReducer
})

export default rootReducer
