// Points Controller don't worry about exporting
import TravelEntry from '../models/travelentry'
import Location from '../models/location'
import Guid from 'guid'
import sanitizeHtml from 'sanitize-html'
import User from '../models/user'
import geolib from 'geolib'
/**
  Gets all travel entries
  @param req
  @param res
  @returns void
  */
export function getTravelEntries(req, res) {
  // Not sure what to populate this with
  TravelEntry.find({ user_id: req.params.user_id }).exec((err, travelEntries) => {
    if (err) {
      res.status(500).send(err)
    }
    res.json({ travelEntries })
  })
}
/**
* Calculates the number of points to be added to the user for the new Travel Entry
* @param req {JSON} - Request sent to function
* @param req {JSON} - Request sent to function
*/
export function calculatePoints(home, location, photoPresent) {
// How to actually calculate the points
  const distance = geolib.getDistance(
    { latitude: location.latitude, longitude: location.longitude },
    { latitude: home.latitude, longitude: home.longitude }
  )
  const diameterOfEarth = 12742000
  let totalPoints = (distance / diameterOfEarth) * distance
  // Incentive users to add photos
  if (photoPresent) {
    totalPoints += 10
  }
  return totalPoints
}
export function createTravelEntry(req, res) {
  const { travelEntry } = req.body
  const {
    title,
    location,
    description,
    photo_url,
  } = travelEntry

  if (!title || !location || !description) {
    res.status(403).end()
    return
  }
  const newTravelEntry = new TravelEntry()
  const newLocation = new Location()
  newLocation.latitude = location.latitude
  newLocation.longitude = location.longitude
  newLocation.save((lerror, lsaved) => {
    if (lerror) {
      res.status(500).send(lerror)
      return
    }
    newTravelEntry.title = sanitizeHtml(title)
    newTravelEntry.location = lsaved
    newTravelEntry.user_id = req.user.user_id
    newTravelEntry.travel_id = Guid.create()
    newTravelEntry.description = sanitizeHtml(description)
    newTravelEntry.photo_url = sanitizeHtml(photo_url)

    let photoPresent = false
    if (newTravelEntry.photo_url !== undefined) {
      photoPresent = true
    }
    User.findOne({ user_id: newTravelEntry.user_id }).exec((err, user) => {
      if (err) {
        res.status(500).send(err)
        return
      }
      newTravelEntry.points = calculatePoints(user.home, lsaved, photoPresent)
      user.points += newTravelEntry.points
      user.save((error) => {
        if (error) {
          res.status(500).send(error)
          return
        }
        newTravelEntry.save((newTravelEntryErr, saved) => {
          if (newTravelEntryErr) {
            res.status(500).send(newTravelEntryErr)
            return
          }
          res.json({ saved })
        })
      })
    })
  })
}

export function deleteTravelEntry(req, res) {
  TravelEntry.findOne({ travel_id: req.params.travel_id }).exec((err, travelentry) => {
    if (err) {
      res.status(500).send(err)
    }

    travelentry.remove(() => {
      res.status(200).end()
    })
  })
}
