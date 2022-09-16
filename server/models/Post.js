import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    desc: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image: { publicId: { type: String, default: "" }, url: { type: String, default: "" } },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;
