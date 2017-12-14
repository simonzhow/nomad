const passport = require('passport')
const FacebookTokenStrategy = require('passport-facebook-token')
import config from '../config'
import User from '../models/user'
import UserHelpers from './user_helpers'

/**
 * @callback passportStrategyDoneCallback
 * @param {Error} error - Error object
 * @param {Object} user - DB user object
 */
/**
  Finds a user (or creates one if necessary) in our DB corresponding to the
  provided FB profile and passes it to the done callback
  @param {string} accessToken - Client's FB-provided access token
  @param {string} refreshToken - Client's FB-provided refresh token
  @param {Object} profile - FB profile object that contains a 'id' property we store in our DB
  @param {passportStrategyDoneCallback} done - Callback that PassportJS requires to continue middleware execution
*/
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

module.exports = () => {
  passport.use(new FacebookTokenStrategy(config.fb, authProcessor))
}
