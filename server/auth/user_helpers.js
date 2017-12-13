import User from '../models/user'

const createNewUser = profile => {
  return new Promise((resolve, reject) => {
    let newUser = new User({
      user_id: profile.id,
      first_name: profile.name.givenName,
      last_name: profile.name.familyName,
      points = 0,
      has_onboarded: false,
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
  createNewUser
}
