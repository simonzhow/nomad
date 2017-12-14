import geolib from 'geolib'

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
  const diameterOfEarth = 12742000
  let totalPoints = (distance / diameterOfEarth) * distance
  // Incentivize users to add photos
  if (photoPresent) {
    totalPoints += 10
  }
  return totalPoints
}
