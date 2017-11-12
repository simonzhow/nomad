import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  latitude: { type: Number, default: 0, required: true },
  longitude: { type: Number, default: 0, required: true },
});

export default mongoose.model('Location', locationSchema);
