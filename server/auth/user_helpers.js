import User from '../models/user'

/**
 * Creates a new user in the DB corresponding to the provided FB profile
 * @param {string} profile.id - User's Facebook profile id
 * @param {Object} profile.name - User's name as an object
 * @param {Array} profile.photos - User's Facebook photos
 * @return {Promise} Promise represents the status of saving the new user to the DB
 */
const createNewUser = ({ id, name, photos }) => {
  return new Promise((resolve, reject) => {
    const newUser = new User({
      user_id: id,
      first_name: name.givenName,
      last_name: name.familyName,
      points: 0,
      home: null,
      profile_pic: photos[0].value || '',
    })

    newUser.save(error => {
      if (error) {
        reject(error)
      } else {
        resolve(newUser)
      }
    })
  })
}

module.exports = {
  createNewUser,
}
