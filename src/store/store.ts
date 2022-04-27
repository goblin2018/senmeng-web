import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from 'store'
import logger from 'redux-logger'

const store = createStore(rootReducer, applyMiddleware(logger, thunk))
export default store
