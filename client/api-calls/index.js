import axios from 'axios'
import reduxStore from '../store'

export const API_ENDPOINTS = {
  GET_CURRENT_USER: '/api/users',
}

// Attach the access token to request Authorization header
const secureCall = (options): * => {
  const auth = reduxStore.getState().authentication
  return axios({
    headers: {
      Authorization: `Bearer ${auth.isLoggedIn ? auth.accessToken : ''}`,
    },
    ...options,
  })
}

export const getCurrentUser = () => secureCall({
  method: 'get',
  url: API_ENDPOINTS.GET_CURRENT_USER,
})
