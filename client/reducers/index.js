// @flow

import { combineReducers } from 'redux'
import authenticationReducer from './authentication'
import userReducer from './user'
import friendsReducer from './friends'

export default combineReducers({
  auth: authenticationReducer,
  user: userReducer,
  friends: friendsReducer,
})
