import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies["jwt"];
    // console.log(`1 ${token}`);
    console.log(`2 ${req.cookies}`)
    // console.log(`3 ${req.headers.cookies}`)
    // console.log(`4 ${req.headers.cookie}`)
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
