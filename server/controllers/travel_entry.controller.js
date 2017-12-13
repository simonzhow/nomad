// Points Controller don't worry about exporting
import TravelEntry from '../models/travelentry'
import Location from '../models/location'
import Guid from 'guid'
import sanitizeHtml from 'sanitize-html'

/**
  Gets all travel entries
  @param req
  @param res
  @returns void
  */
export function getTravelEntries(req, res) {
  // Not sure what to populate this with
  TravelEntry.find({ user_id: req.params.user_id }).exec((err, travelentries) => {
    if (err) {
      res.status(500).send(err)
    }
    res.json({ travelentries })
  })
}

export function createTravelEntry(req, res) {
  const { travelEntry } = req.body
  const {
    title,
    location,
    user_id,
    description,
    photo_url,
  } = travelEntry

  if (!title || !location || !user_id || !description || !photo_url) {
    res.status(403).end()
  }

  const newTravelEntry = new TravelEntry()
  const newLocation = new Location()
  newLocation.latitude = location.latitude
  newLocation.longitude = location.longitude
  newLocation.save((lerror, lsaved) => {
    if (lerror) {
      res.status(500).send(lerror)
    }
    newTravelEntry.title = sanitizeHtml(title)
    newTravelEntry.location = lsaved
    newTravelEntry.user_id = sanitizeHtml(user_id)
    newTravelEntry.travel_id = Guid.create()
    newTravelEntry.description = sanitizeHtml(description)
    newTravelEntry.photo_url = sanitizeHtml(photo_url)
    // newTravelEntry.points = calculatePoints(req, res)

    newTravelEntry.save((err, saved) => {
      if (err) {
        res.status(500).send(err)
      }
      res.json({ saved })
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
