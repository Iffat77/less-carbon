import mongoose from "mongoose";
const Schema = mongoose.Schema;

let threadSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  wall: {
    type: Schema.Types.ObjectId,
    ref: 'Wall',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Thread", threadSchema);