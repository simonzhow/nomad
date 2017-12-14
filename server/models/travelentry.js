import mongoose from 'mongoose'
const Schema = mongoose.Schema

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
