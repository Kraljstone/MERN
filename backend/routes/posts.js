import express from 'express';
import { getPosts, createPost, updatePost } from '../controllers/userPosts.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getPosts);
router.post('/', protect, createPost);
router.patch('/:id', protect, updatePost);

export default router;
