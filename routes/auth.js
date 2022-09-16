import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/authController.js";
import {authenticate} from '../middlewares/authentication.js'

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/logout', authenticate, logoutUser);


export default router;