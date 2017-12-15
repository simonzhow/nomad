// @flow

import {
  UPDATE_FRIENDS_ACTION,
} from '../actions/types'

const DEFAULT_FRIENDS_STATE = []

const friendsReducer = (state = DEFAULT_FRIENDS_STATE, action) => {
  switch (action.type) {
    case UPDATE_FRIENDS_ACTION:
      return action.payload
    default:
      return state
  }
}

export default friendsReducer
