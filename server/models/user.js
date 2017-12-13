import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
  user_id: { type: String, required: true },
  first_name: { type: 'String', required: true },
  last_name: { type: 'String', required: true },
  // home: { type: Schema.Types.ObjectId, ref: 'Location' },
  points: { type: Number, required: true },
})

export default mongoose.model('User', userSchema)
