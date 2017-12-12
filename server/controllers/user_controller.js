import User from '../models/user'
import sanitizeHtml from 'sanitize-html'
import Guid from 'guid'
import bcrypt from 'bcrypt'
const saltRounds = 10

/**
  Gets a user using email address
  @param req
  @param res
  @returns void
  */
export function getUser(req, res) {
  if (req.body.user.email_address) {
    User.findOne({ email_address: req.body.user.email_address }).exec((err, user) => {
      if (err) {
        res.status(500).send(err)
      }
      res.json({ user })
    })
  }
  if (req.body.user.user_id) {
    User.findOne({ user_id: req.body.user.user_id }).exec((err, user) => {
      if (err) {
        return res.status(500).send(err)
      }
      res.json({ user })
    })
  }
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
    return res.status(403).end()
  }
  if (password !== confirm_password) {
    return res.status(403).end()
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
      return res.status(500).send(err)
    }

    newUser.password = hash

    newUser.save((error, saved) => {
      if (error) {
        return res.status(500).send(error)
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
      return res.status(500).send(err)
    }

    user.remove(() => {
      res.status(200).end()
    })
  })
}
