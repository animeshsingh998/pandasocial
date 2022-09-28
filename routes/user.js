import express from 'express';
import { aeiou, deleteUser, followAndUnfollow, getMyProfile, getProfileById, searchUser, updateUser } from '../controllers/userController.js';
import {authenticate} from '../middlewares/authentication.js';

const router = express.Router();

router.put('/updateprofile/:token', authenticate, updateUser);
router.get('/myprofile/:token', authenticate, getMyProfile);
router.get('/:id/profile/:token', authenticate, getProfileById);
router.put('/:id/follow/:token', authenticate, followAndUnfollow);
router.delete('/delacc/:token', authenticate, deleteUser);
router.get('/search/:query/:token', authenticate, searchUser);
router.get('/aeiou', aeiou);

export default router;