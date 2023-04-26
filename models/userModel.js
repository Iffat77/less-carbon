import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true 
  },
  password: {
    type: String,
    required: [true, 'Please add a password']
  },
}, {
  timestamps: true
})

export default mongoose.model("User", userSchema);