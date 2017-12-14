import geolib from 'geolib'
const DISTANCE_TO_POINTS = {
  10: 10,
  50: 25,
  100: 50,
  250: 75,
  500: 100,
  1000: 150,
  2500: 200,
  5000: 250,
  10000: 300,
  20000: 400,
  25000: 500,
}
/**
* Calculates the number of points to be added to the user for the new Travel Entry
* @param req {JSON} - Request sent to function
* @param req {JSON} - Request sent to function
*/
export function calculatePoints(user, location, photoPresent) {
// How to actually calculate the points
  const distance = geolib.getDistance(
    { latitude: location.lat, longitude: location.lng },
    { latitude: user.home.lat, longitude: user.home.lng }
  )
  const getPointsForDistance = (d) => {
    const distances = Object.keys(DISTANCE_TO_POINTS).map(Number)
    for (let x = 0; x < distances.length; x++) {
      if (distances[x] < d) {
        return distances[x]
      }
    }
    return 0
  }
  let points = getPointsForDistance(distance)
  // Incentivize users to add photos
  if (photoPresent) {
    points += 10
  }
  return points
}
