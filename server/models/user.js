import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
  first_name: { type: 'String', required: true },
  last_name: { type: 'String', required: true },
  email: { type: 'String', required: true },
  username: { type: 'String', required: true },
  home: [{ type: Schema.Types.ObjectId, ref: 'Location' }],
  points: { type: 'int', required: true },
  travel_entry: [{ type: Schema.Types.ObjectId, ref: 'TravelEntry' }],
  date_added: { type: 'Date', default: Date.now, required: true },
})

export default mongoose.model('User', userSchema)
