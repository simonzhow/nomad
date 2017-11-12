import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const travelEntrySchema = new Schema({
	travel_id: { type: String, required: true },
	user_id: { type: String, required: true },
	location: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
	points: { type: Number, required: true },
});

export default mongoose.model('TravelEntry', travelEntrySchema);