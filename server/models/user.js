import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
  user_id: { type: String, required: true },
  first_name: { type: 'String', required: true },
  last_name: { type: 'String', required: true },
  home: Schema.Types.Mixed,
  points: { type: Number, required: true },
  profile_pic: { type: String },
})

export default mongoose.model('User', userSchema)
