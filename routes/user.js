import express from 'express';
import { deleteUser, followAndUnfollow, getMyProfile, getProfileById, searchUser, updateUser } from '../controllers/userController.js';
import {authenticate} from '../middlewares/authentication.js';

const router = express.Router();

router.put('/updateprofile', authenticate, updateUser);
router.get('/myprofile', authenticate, getMyProfile);
router.get('/:id/profile', authenticate, getProfileById);
router.put('/:id/follow', authenticate, followAndUnfollow);
router.delete('/delacc', authenticate, deleteUser);
router.get('/search/:query', authenticate, searchUser);

export default router;