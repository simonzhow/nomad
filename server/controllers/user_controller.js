import User from '../models/user'
import sanitizeHtml from 'sanitize-html'
import Guid from 'guid'
import bcrypt from 'bcrypt'
const saltRounds = 10

/**
  Finds or creates a user
  @param req
  @param res
  @returns void
  */
export function getUser(req, res) {
  res.json({ req.user })
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
