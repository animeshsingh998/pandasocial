import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: String,
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: [
      {
        publicId: { type: String, default: "" },
        url: { type: String, default: "" },
      },
    ],
    cover: [
      {
        publicId: { type: String, default: "" },
        url: { type: String, default: "" },
      },
    ],
    status: String,
    livesIn: String,
    worksAt: String,
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isAdmin: { type: Boolean, default: false },
    profession: { type: String, max: 10 },
  },
  { timestamps: true }
);


const User = mongoose.model("User", userSchema);
export default User;
