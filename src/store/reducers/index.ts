import { User } from 'api/user'
import { combineReducers } from 'redux'
import userReducer from 'store/reducers/user'

export interface State {
  user: User
}

const rootReducer = combineReducers<State>({
  user: userReducer
})

export default rootReducer
