// @flow

import {
  UPDATE_AUTH_ACTION,
} from '../actions/types'

const DEFAULT_AUTHENTICATION_STATE = {
  isLoggedIn: null,
  accessToken: null,
}

const authenticationReducer = (state = DEFAULT_AUTHENTICATION_STATE, action) => {
  switch (action.type) {
    case UPDATE_AUTH_ACTION:
      if (action.payload) {
        const { accessToken } = action.payload
        return { isLoggedIn: true, accessToken }
      }
      return { isLoggedIn: false, accessToken: null }
    default:
      return state
  }
}

export default authenticationReducer
