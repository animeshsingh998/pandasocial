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

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/user/post', postRoutes);
cloudinary.config({
  cloud_name: "dqmfwxe2z",
  api_key: "442756742463658",
  api_secret: "h61JRSY6T1y-izmFYt-wt5GXRN4",
});

mongoose
  .connect(
    "mongodb+srv://animesh007:animeshpanda007@cluster0.snohdbx.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(console.log("Connection with database Successfull"))
  .catch((error) => {
    console.log(error.message);
  });

app.listen(process.env.PORT, () => {
  console.log(`server runnning at PORT ${process.env.PORT}`);
});
