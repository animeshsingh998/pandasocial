import Post from "../models/Post.js";
import User from "../models/User.js";
import { validIdParams } from "../middlewares/utils.js";
import cloudinary from 'cloudinary';

export const createPost = async (req, res) => {
  const user = await User.findById(req.user._id);
  const userId = user._id;
  const { desc, image } = req.body;
  let postIns = null;
  try {
    if (image && image.length > 2) {
      postIns = cloudinary.v2.uploader.upload(image, { folder: "posts" });
    }
    const postData = {
      userId,
      desc,
      image: {
        publicId: postIns == null ? "" : (await postIns).public_id,
        url: postIns == null ? "" : (await postIns).secure_url
      }

    }
    const post = new Post(postData);
    if (post) {
      await post.save();
      user.posts.push(post._id);
      await user.save();
      return res.status(201).json({message: "Post Added."});
    } else {
      return res.status(400).json({error: "something went wrong."});
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updatePost = async (req, res) => {
  const valid = validIdParams(req.params.id);
  if (!valid) {
    return res.status(404).json("post not found.");
  }
  const postT = await Post.findById(req.params.id);
  if (postT.userId.toString() != req.user._id.toString()) {
    return res.status(401).json("You can only update your own post.");
  }
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const likeDislike = async (req, res) => {
  const user = await User.findById(req.user._id);
  const valid = validIdParams(req.params.id);
  if (!valid) {
    return res.status(404).json("user not found");
  }
  const postToLike = await Post.findById(req.params.id);

  try {
    if (postToLike.likes.includes(user._id)) {
      postToLike.likes.pull(user._id);
      await postToLike.save();
      return res.status(200).json({message: "Post Disliked."});
    }

    postToLike.likes.push(user._id);
    await postToLike.save();
    return res.status(200).json({message: "Post Liked."});
  } catch (error) {
    return res.status(500).json({error:error.message});
  }
};

export const getTimeline = async (req, res) => {
  try {
    const userPosts = await Post.find({ userId: { $in: req.user.following } }).populate("userId")
    const myPosts = await Post.find({ userId: req.user._id }).populate("userId")

    return res.status(200).json(userPosts.concat(...myPosts));
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.user._id }).populate("userId");
    return res.status(200).json({posts});
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  const owner = await User.findById(post.userId._id);
  if (post.userId._id.toString() !== req.user._id.toString()) {
    return res.status(401).json({ error: "Unauthorized User." });
  };
  try {
    if (post.image.publicId) {
      cloudinary.v2.uploader.destroy(post.image.publicId);
    }
    owner.posts.pull(post._id);
    await owner.save();
    post.remove();
    return res.status(200).json({ message: "Post deleted." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

