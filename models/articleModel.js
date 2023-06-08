import mongoose from "mongoose";

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment",
  }],
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Article", articleSchema);
