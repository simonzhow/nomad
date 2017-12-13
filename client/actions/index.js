import {
  UPDATE_AUTH_ACTION,
} from './types'

export const updateAuth = (accessToken) => ({
  type: UPDATE_AUTH_ACTION,
  payload: { accessToken },
})
