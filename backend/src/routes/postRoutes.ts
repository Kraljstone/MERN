import express, { Router } from 'express';
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
} from '../controllers/postsController';

const router: Router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);

export default router;
