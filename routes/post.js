import express from "express";
import { createPost, deletePost, getMyPosts, getTimeline, likeDislike, updatePost } from "../controllers/postController.js";
import { authenticate } from "../middlewares/authentication.js";

const router = express.Router();

router.post('/create', authenticate, createPost);
router.put('/:id/update', authenticate, updatePost);
router.put('/:id/like', authenticate, likeDislike);
router.put('/user/post/:id/like', authenticate, likeDislike);
router.get('/timeline', authenticate, getTimeline);
router.get('/myposts', authenticate, getMyPosts);
router.delete('/:id/delete', authenticate, deletePost);

export default router;
