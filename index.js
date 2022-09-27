import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import postRoutes from './routes/post.js'
import cloudinary from 'cloudinary'
import cors from 'cors'

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use('/auth', cors(), authRoutes);
app.use('/user', cors(), userRoutes);
app.use('/post', cors(), postRoutes);
app.use('/user/post', postRoutes);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connection with database Successfull"))
  .catch((error) => {
    console.log(error.message);
  });

app.listen(process.env.PORT, () => {
  console.log(`server runnning at PORT ${process.env.PORT}`);
});
