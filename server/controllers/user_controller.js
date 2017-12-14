import User from '../models/user'
import TravelEntry from '../models/travelentry'
import sanitizeHtml from 'sanitize-html'
import Guid from 'guid'
import bcrypt from 'bcrypt'

import FB from 'fb'

const saltRounds = 10

/**
  Finds or creates a user
  @param req
  @param res
  @returns void
  */
export function getUser(req, res) {
  // BIBEK: I think we should attach the user's travel entries along with the user object
  // so they don't have to make another request
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
  Sets a user's home location
  @param req
  @param res
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

/**
  Creates/registers a new user
  @param req
  @param res
  @returns void
  */
export function createUser(req, res) {
  const { user } = req.body
  const {
    first_name,
    last_name,
    email_address,
    username,
    password,
    confirm_password,
  } = user

  if (!first_name || !last_name
    || !email_address || !username
    || !password || !confirm_password) {
    res.status(403).end()
    return
  }
  if (password !== confirm_password) {
    res.status(403).end()
    return
  }

  const newUser = new User()

  newUser.first_name = sanitizeHtml(first_name)
  newUser.last_name = sanitizeHtml(last_name)
  newUser.email_address = sanitizeHtml(email_address)
  newUser.username = sanitizeHtml(username)
  // newUser.home = sanitizeHtml(home);
  newUser.points = 0
  newUser.user_id = Guid.create()

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      res.status(500).send(err)
      return
    }

    newUser.password = hash

    newUser.save((error, saved) => {
      if (error) {
        res.status(500).send(error)
        return
      }

      res.json({ saved })
    })
  })
}

/**
  Deletes an existing user
  @param req
  @param res
  @returns void
  */
export function deleteUser(req, res) {
  User.findOne({ user_id: req.params.user_id }).exec((err, user) => {
    if (err) {
      res.status(500).send(err)
      return
    }

    user.remove(() => {
      res.status(200).end()
    })
  })
}
