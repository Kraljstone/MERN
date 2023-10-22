import express from 'express';
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from '../controllers/userPosts.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getPosts);
router.post('/', protect, createPost);
router.patch('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);
router.patch('/:id/likePost', protect, likePost);

export default router;
