import TravelEntry from '../models/travelentry'
import FB from 'fb'

/**
  Responds to client with the user object for req.user.user_id; additionally
  attaches the user's travelEntries to the response
  @param {Object} req - Express Request object
  @param {Object} res - Express Response object
  @returns void
  */
export function getUser(req, res) {
  const access_token = req.header('authorization').split(' ')[1]
  const { user_id } = req.user

  FB.api('me', { fields: ['id', 'name', 'friends'], access_token }, (response) => {
    if (!response || response.error) {
      res.status(500).send(response.error); return
    }

    const { friends } = response
    TravelEntry.find({ user_id }).exec((err, travelEntries) => {
      if (err) {
        res.status(500).send(err); return
      }
      res.json({ user: Object.assign({}, req.user.toObject(), { travelEntries, friends }) })
    })
  })
}

/**
  Sets a user's home location using the home coordinates on req.body.home
  @param {Object} req - Express Request object
  @param {Object} res - Express Response object
  @returns void
  */
export function onboard(req, res) {
  req.user.home = req.body.home
  req.user.save((error, saved) => {
    if (error) {
      res.status(500).send(error)
      return
    } else {
      saved.travelEntries = []
      res.json({ user: saved })
    }
  })
}
