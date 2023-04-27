import mongoose from "mongoose";
const Schema = mongoose.Schema;

let wallSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  threads: [{
    type: Schema.Types.ObjectId,
    ref: 'Thread'
  }]
});

export default mongoose.model("Wall", wallSchema);
