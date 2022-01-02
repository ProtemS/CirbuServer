import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true, minlength: 6 },
  nickname: { type: String },
  gender: { type: String, enum: ["male", "female"], required: true },
});
export default mongoose.model("user", userSchema);
