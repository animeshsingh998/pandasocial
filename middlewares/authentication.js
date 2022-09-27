import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies["jwt"];
    if (!token) {
      return res.status(403).json({error: "Please Login First"});
    }

    const data = await jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findOne({ _id: data._id });
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({error: "Please Login First"});
  }
};
