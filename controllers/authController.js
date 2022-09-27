import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {getDetails} from '../middlewares/utils.js'

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const checkEmail = await User.findOne({ email });
  const checkUname = await User.findOne({ username });
  if (checkEmail) {
    return res.status(400).json({error: "Email already exists."})
  }
  if (checkUname) {
    return res.status(400).json({error: "Username already exists."})
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    username,
    email,
    password: hashedPassword,
    cover: {
      publicId: "",
      url: "",
    },
    avatar: {
      publicId: "",
      url: "",
    },
  };
  const user = new User(newUser);
  try {
    await user.save();
    const token = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_KEY
    );
    const otherDetails = getDetails(user)
    return res.status(201).cookie("jwt", token, { httpOnly: true }).json(otherDetails);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    try {
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        const token = jwt.sign(
          { _id: user._id, isAdmin: user.isAdmin },
          process.env.JWT_KEY
        );
        const otherDetails = getDetails(user);
        return res
          .status(200)
          .cookie("jwt", token, { domain: "https://pandasocial.netlify.app", path: "/base" })
          .json({ otherDetails, token });
      } else {
        return res.status(400).json({error: "Invalid Password"});
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    return res.status(404).json({error: "user not found"});
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.status(200).cookie("jwt", null).json("Logged out Successfully.");
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
};
