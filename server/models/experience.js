import mongoose from 'mongoose'
const Schema = mongoose.Schema

const experienceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: [{ type: Schema.Types.ObjectId, ref: 'Location' }],
  date_added: { type: 'Date', default: Date.now, required: true },
})

export default mongoose.model('Experience', experienceSchema)
