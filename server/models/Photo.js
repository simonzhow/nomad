import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  title: { type: String, default: "", required: true },
  image: { type: JSON, default: 0, required: true },
});

export default mongoose.model('Photo', photoSchema);
