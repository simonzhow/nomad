import axios from 'axios'

export const createTravelEntry = (travelEntry) => {
  axios({
    method: 'post',
    url: '/api/travelentries',
    body: {
      travelEntry,
    },
  })
}
