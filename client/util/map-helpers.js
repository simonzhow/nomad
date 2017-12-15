import airportGuruIcon from '../static/img/leaderboard/airportguru.png'
import onTheFlyIcon from '../static/img/leaderboard/onthefly.png'
import roadsterIcon from '../static/img/leaderboard/roadster.png'
import worldTraveler from '../static/img/leaderboard/worldtraveler.png'

const POINTS_TO_RANK = {
  0: { name: 'Roadster', image: roadsterIcon },
  1000: { name: 'Airport Guru', image: airportGuruIcon },
  10000: { name: 'On The Fly', image: onTheFlyIcon },
  100000: { name: 'World Traveler', image: worldTraveler },
}

// Converts a degrees-minutes-seconds representation to decimal
// e.g. [38, 5, 42.86] => 38.095284
export const dmsToDecimal = (dms) => (
  dms.reduce((acc, val, i) => (acc + (val / Math.pow(60, i))), 0)
)

export const getRankFromPoints = (points) => {
  const pointKeys = Object.keys(POINTS_TO_RANK).map(Number).sort((a, b) => b - a)
  for (let i = 0; i < pointKeys.length; i++) {
    if (points > pointKeys[i]) {
      return POINTS_TO_RANK[pointKeys[i]]
    }
  }
  return POINTS_TO_RANK[pointKeys[0]]
}
