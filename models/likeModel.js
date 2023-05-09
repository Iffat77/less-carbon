import mongoose from "mongoose";
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  article: {
    type: Schema.Types.ObjectId,
    ref: "Article",
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

export default mongoose.model("Like", likeSchema);
