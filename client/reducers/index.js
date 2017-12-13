// @flow

import { combineReducers } from 'redux'
import authenticationReducer from './authentication'
import userReducer from './user'

export default combineReducers({
  auth: authenticationReducer,
  user: userReducer,
})
