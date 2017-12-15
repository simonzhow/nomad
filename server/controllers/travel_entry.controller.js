import TravelEntry from '../models/travelentry'
import Guid from 'guid'
import sanitizeHtml from 'sanitize-html'
import User from '../models/user'
import FB from 'fb'
import async from 'async'
import { calculatePoints } from '../util/travel-entry-helpers'

/**
  Gets all travel entries for the user making the request
  @param {Object} req - Express Request object
  @param {Object} res - Express Response object
  @returns void
  */
export function getTravelEntries(req, res) {
  const access_token = req.header('authorization').split(' ')[1]
  const user_id = req.params.user_id
  let isFriend = false

  if (req.user.user_id === user_id) {
    TravelEntry.find({ user_id }).exec((err, travelEntries) => {
      if (err) {
        res.status(500).send(err)
        return
      }
      res.json({ travelEntries })
    })
  } else {
    FB.api('me', { fields: ['id', 'name', 'friends'], access_token }, (response) => {
      if (!response || response.error) {
        res.status(500).send(response.error); return
      }

      const { friends } = response
      for (let i = 0; i < friends.data.length; i++) {
        if (friends.data[i].id === user_id) {
          isFriend = true
          break
        }
      }

      if (isFriend) {
        TravelEntry.find({ user_id }).exec((err, travelEntries) => {
          if (err) {
            res.status(500).send(err)
            return
          }
          res.json({ travelEntries })
        })
      } else {
        res.status(403)
        return
      }
    })
  }
}

/**
  Creates a travel entry for the user making the request using entry info
  provided onr req.body; req.body.location is provided as serialized JSON
  @param {Object} req - Express Request object
  @param {Object} res - Express Response object
  @returns void
  */
export function createTravelEntry(req, res) {
  const { title, description, photoUrl } = req.body
  const location = JSON.parse(req.body.location)
  if (!title || !location || !description) {
    res.status(400).end()
    return
  }
  const newTravelEntry = new TravelEntry()
  newTravelEntry.title = sanitizeHtml(title)
  newTravelEntry.description = sanitizeHtml(description)
  newTravelEntry.photo_url = photoUrl || null
  newTravelEntry.location = location
  newTravelEntry.user_id = req.user.user_id
  newTravelEntry.travel_id = Guid.create()

  async.waterfall([
    function (cb) {
      // Find the user making the request, calculate entry points, and update
      // user and entry with the points
      User.findOne({ user_id: newTravelEntry.user_id }).exec((userFindErr, user) => {
        if (userFindErr) { cb(userFindErr) }
        newTravelEntry.points = calculatePoints(user, location, Boolean(req.file))
        user.points += newTravelEntry.points
        user.save((userSaveErr) => {
          if (userSaveErr) { cb(userSaveErr) }
          cb(null)
        })
      })
    },
    function (cb) {
      // Save the travel entry
      newTravelEntry.save((newTravelEntryErr, saved) => {
        if (newTravelEntryErr) { cb(newTravelEntryErr) }
        res.json({ saved })
        cb(null)
      })
    },
  ], (err) => {
    if (err) { res.status(500).send(err) }
  })
}

/**
  Deletes the specified travel entry if the requesting user owns it
  @param {Object} req - Express Request object
  @param {Object} res - Express Response object
  @returns void
  */
export function deleteTravelEntry(req, res) {
  TravelEntry.findOne({ travel_id: req.params.travel_id }).exec((err, travelentry) => {
    if (err) {
      res.status(500).send(err)
      return
    }
    travelentry.remove(() => {
      res.status(200).end()
    })
  })
}
