import mongoose from 'mongoose'
const Schema = mongoose.Schema
/**
 * @class Declares the TravelEntry Schema for Mongo DB
 * @param travel_id {String} id of the travel entry
 * @param user_id {String} user_id associated with the travel entry
 * @param title {String} title of the travel entry
 * @param description {String} description of the travel entry
 * @param location {Mixed} location of the experience
 * @param photo_url {String} string url of the photo as received from Cloudinary
 * @param points {Number} number of points for this travel entry
 * @returns void
 */
const travelEntrySchema = new Schema({
  travel_id: { type: String, required: true },
  user_id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: Schema.Types.Mixed,
  photo_url: { type: String },
  points: { type: Number, required: true },
})

export default mongoose.model('TravelEntry', travelEntrySchema)
