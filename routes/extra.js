import express from 'express';
import { sendMail } from '../controllers/extra.js';


const router = express.Router()

router.get("/sendmail", sendMail)

export default router;