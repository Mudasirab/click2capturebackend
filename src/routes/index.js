import express from 'express';
import comment from './comment';
const router = express.Router();

router.use(express.json());

router.use('/comments', comment);

export default router;