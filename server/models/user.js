import mongoose from 'mongoose'
const Schema = mongoose.Schema
/**
 * @class Declares the User Schema for Mongo DB
 * @param user_id {String} user_id of the User
 * @param first_name {String} first name of the User
 * @param last_name {String} last name of the User
 * @param home {Mixed} User's home location
 * @param points {Number} number of points the User has
 * @param profile_pic {String} string representation of profile picture of User
 * @returns void
 */
const userSchema = new Schema({
  user_id: { type: String, required: true },
  first_name: { type: 'String', required: true },
  last_name: { type: 'String', required: true },
  home: Schema.Types.Mixed,
  points: { type: Number, required: true },
  profile_pic: { type: String },
})

export default mongoose.model('User', userSchema)
