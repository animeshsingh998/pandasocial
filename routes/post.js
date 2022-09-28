import express from "express";
import { createPost, deletePost, getMyPosts, getTimeline, likeDislike, updatePost } from "../controllers/postController.js";
import { authenticate } from "../middlewares/authentication.js";

const router = express.Router();

router.post('/create/:token', authenticate, createPost);
router.put('/:id/update/:token', authenticate, updatePost);
router.put('/:id/like/:token', authenticate, likeDislike);
router.put('/user/post/:id/like/:token', authenticate, likeDislike);
router.get('/timeline/:token', authenticate, getTimeline);
router.get('/myposts/:token', authenticate, getMyPosts);
router.delete('/:id/delete/:token', authenticate, deletePost);

export default router;
