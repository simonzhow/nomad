// @flow

import {
  UPDATE_USER_ACTION,
} from '../actions/types'

const DEFAULT_USER_STATE = null

const userReducer = (state = DEFAULT_USER_STATE, action) => {
  switch (action.type) {
    case UPDATE_USER_ACTION:
      return action.payload
    default:
      return state
  }
}

export default userReducer
