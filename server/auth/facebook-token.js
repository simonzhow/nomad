const passport = require('passport')
const FacebookTokenStrategy = require('passport-facebook-token')
import config from '../config'
import User from '../models/user'
import UserHelpers from './user_helpers'

module.exports = () => {
  const authProcessor = (accessToken, refreshToken, profile, done) => {
    // Find a user in the local db using the profile.id
    // If the user is found, return the user data using the done()
    // If the user is not found, create one in the local db and return
    User.findOne({ user_id: profile.id }).then(user => {
      if (user) {
        done(null, user)
      } else {
        UserHelpers
          .createNewUser(profile)
          .then(newUser => done(null, newUser))
          .catch(error => {
            // eslint-disable-next-line no-console
            console.log('error', `Error when creating new user: ${error}`)
          })
      }
    })
  }
  passport.use(new FacebookTokenStrategy(config.fb, authProcessor))
}
