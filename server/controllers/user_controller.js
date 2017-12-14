import TravelEntry from '../models/travelentry'

/**
  Responds to client with the user object for req.user.user_id; additionally
  attaches the user's travelEntries to the response
  @param {Object} req - Express Request object
  @param {Object} res - Express Response object
  @returns void
  */
export function getUser(req, res) {
  TravelEntry.find({ user_id: req.user.user_id }).exec((err, travelEntries) => {
    if (err) {
      res.status(500).send(err); return
    }
    res.json({ user: Object.assign({}, req.user.toObject(), { travelEntries }) })
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
