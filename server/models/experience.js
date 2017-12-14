import mongoose from 'mongoose'
const Schema = mongoose.Schema
/**
 * @class Declares the experiences Schema for Mongo DB
 * @param name {String} name of the experience
 * @param description {String} description of the experience
 * @param location {Location} location of the experience
 * @param date_added {Date} date experience was added
 * @returns void
 */
const experienceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: [{ type: Schema.Types.ObjectId, ref: 'Location' }],
  date_added: { type: 'Date', default: Date.now, required: true },
})

export default mongoose.model('Experience', experienceSchema)
