import User from "../models/User.js";
import Post from "../models/Post.js";
import cloudinary from "cloudinary";
import { getDetails, validIdParams } from "../middlewares/utils.js";

export const updateUser = async (req, res) => {
  const oldAvatarId = req.user.avatar[0].publicId;
  const oldCoverId = req.user.cover[0].publicId;
  let coverIns = null;
  let avatarIns = null;

  if (req.body.avatar ? req.body.avatar.length > 2 : false) {
    cloudinary.v2.uploader.destroy(oldAvatarId);
    avatarIns = cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
    });
  }
  if (req.body.cover ? req.body.cover.length > 2 : false) {
    cloudinary.v2.uploader.destroy(oldCoverId);
    coverIns = cloudinary.v2.uploader.upload(req.body.cover, {
      folder: "covers",
    });
  }

  const { cover, avatar, ...otherData } = req.body;
  const updateData = {
    cover: {
      publicId:
        (coverIns && (await coverIns).public_id) || req.user.cover[0].publicId,
      url: (coverIns && (await coverIns).secure_url) || req.user.cover[0].url,
    },
    avatar: {
      publicId:
        (avatarIns && (await avatarIns).public_id) ||
        req.user.avatar[0].publicId,
      url:
        (avatarIns && (await avatarIns).secure_url) || req.user.avatar[0].url,
    },
    ...otherData,
  };

  const user = await User.findByIdAndUpdate(req.user._id, updateData, {
    new: true,
  });
  try {
    await user.save();
    return res.status(200).json({ message: "UserUpdated" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json("user not found");
    }
    const { password, ...otherDetails } = user._doc;
    return res.status(200).json({ ...otherDetails });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getProfileById = async (req, res) => {
  const valid = validIdParams(req.params.id);
  if (!valid) {
    return res.status(404).json({ error: "User not found." });
  }
  try {
    const user = await User.findOne({ _id: req.params.id }).populate("");
    const postsOfUser = await Post.find({ userId: user._id }).populate("userId");
    if (user) {
      const otherDetails = getDetails(user);
      return res.status(200).json({ ...otherDetails, postsOfUser });
      // return res.status(200).json({ postsOfUser });
    } else {
      return res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const followAndUnfollow = async (req, res) => {
  const user = await User.findById(req.user._id);
  const valid = validIdParams(req.params.id);
  if (!valid) {
    return res.status(404).json({error: "user not found"});
  }
  const userToFollow = await User.findById(req.params.id);
  try {
    if (user.following.includes(req.params.id)) {
      user.following.pull(req.params.id);
      userToFollow.followers.pull(req.user._id);
      await user.save();
      await userToFollow.save();
      return res.status(200).json({message: "user unfollowed."});
    }

    user.following.push(req.params.id);
    userToFollow.followers.push(req.user._id);
    await user.save();
    await userToFollow.save();
    return res.status(200).json({message: "user followed."});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.user._id);
  const posts = user.posts;
  const following = user.following;
  const followers = user.followers;
  try {
    posts.length > 0 &&
      posts.forEach(async (postId) => {
        await Post.findByIdAndRemove(postId);
      });

    following.length > 0 &&
      following.forEach(async (item) => {
        const user1 = await User.findById(item);
        user1.followers.pull(req.user._id);
        await user1.save();
      });

    followers.length > 0 &&
      followers.forEach(async (item) => {
        const user1 = await User.findById(item);
        user1.following.pull(req.user._id);
        await user1.save();
      });

    await user.remove();
    return res.status(200).cookie("jwt", null).json("account deleted.");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const searchUser = async (req, res) => {
  try {
    const query = req.params.query;
    const result = await User.find({ username: { $regex: `${query}` } });

    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
