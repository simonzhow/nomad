import axios from 'axios'
import {
  UPDATE_AUTH_ACTION,
  UPDATE_USER_ACTION,
} from './types'
import {
  GET_USER,
} from '../constants/api-endpoints'

export const updateAuth = (accessToken) => ({
  type: UPDATE_AUTH_ACTION,
  payload: { accessToken },
})

export const updateUser = (user) => {
  return {
    type: UPDATE_USER_ACTION,
    payload: user,
  }
}

export const getUserAsync = (onSuccess) => (
  (dispatch, getState) => {
    return axios({
      method: 'get',
      url: GET_USER,
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    }).then(response => {
      dispatch(updateUser(response.data.user))
      if (typeof onSuccess === 'function') { onSuccess(response.data.user) }
    }).catch(err => {
      // eslint-disable-next-line no-console
      console.log(err)
    })
  }
)
