import axios from 'axios'
import {
  UPDATE_AUTH_ACTION,
  UPDATE_USER_ACTION,
} from './types'

export const API_ENDPOINTS = {
  GET_CURRENT_USER: '/api/users',
}

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
      url: API_ENDPOINTS.GET_CURRENT_USER,
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    }).then(response => {
      if (typeof onSuccess === 'function') { onSuccess(response.data.user) }
      dispatch(updateUser(response.data.user))
    }).catch(err => {
      console.log(err)
    })
  }
)
